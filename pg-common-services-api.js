const AWS = require('aws-sdk');

let ENDPOINT, HOST, STAGE;
let PRIVATE = false;
let SIGN = true;
let BASE_PATH = "/api/services/";
let PN_PATH = BASE_PATH + "pushNotifications";
let EMAIL_PATH = BASE_PATH + "email";
let DEBUG_PATH = BASE_PATH + "debug";
let HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST'
}

async function config(options) {
    if (options.endpoint)
        ENDPOINT = new AWS.Endpoint(options.endpoint);
    SIGN = !!options.sign;
    PRIVATE = !!options.private;
    HOST = options.host;
    STAGE = options.stage;
    if (SIGN)
        await checkCredentials();
}

function loadEcsCredentials() {
    return new Promise(function (resolve, reject) {
        AWS.config.credentials = new AWS.RemoteCredentials({
            httpOptions: { timeout: 5000 },
            maxRetries: 10,
            retryDelayOptions: { base: 200 }
        });
        AWS.config.credentials.load((err, credential) => {
            if (!err) {
                console.debug("AWS SDK remote credential ready, expiry is:", credential.expireTime);
                resolve(true);
            } else {
                reject(err.message)
            }
        })
    });
}

async function checkCredentials() {
    let now = new Date();
    if (!AWS.config.credentials || AWS.config.credentials.expired)
        return await loadEcsCredentials();
    else
        return true;
}

function sendRequest(request) {
    const send = new AWS.NodeHttpClient();
    return new Promise((res, rej) => {
        send.handleRequest(request, null, function (response) {
            let respBody = "";
            response.on("data", function (chunk) {
                respBody += chunk;
            });
            response.on("end", function () {
                try {
                    res(JSON.parse(respBody));
                } catch (e) {
                    rej(new Error(respBody));
                }
            });
        }, function (err) {
            rej(err);
        });
    })
}

async function signAndSendRequest(path, method, payload) {

    let request = new AWS.HttpRequest(ENDPOINT);
    request.method = method;
    request.path = path;
    if (STAGE)
        request.path = `/${STAGE}${request.path}`;
    request.region = "ap-southeast-1";
    request.headers["presigned-expires"] = false;
    request.headers["Host"] = ENDPOINT.host;
    if (PRIVATE)
        request.headers["Host"] = HOST;
    request.body = JSON.stringify(payload);
    if (SIGN) {
        await checkCredentials();
        const signer = new AWS.Signers.V4(request, "execute-api");
        signer.addAuthorization(AWS.config.credentials, new Date());
    }
    return await sendRequest(request);
}


sendPushNotification = (payload) => {
    return signAndSendRequest(PN_PATH, HTTP_METHOD.POST, payload);
}


sendEmail = (payload) => {
    return signAndSendRequest(EMAIL_PATH, HTTP_METHOD.POST, payload);
}

testApiGwConnection = () => {
    return signAndSendRequest(DEBUG_PATH, HTTP_METHOD.GET);
}

module.exports.config = config;
module.exports.checkCredentials = checkCredentials;
module.exports.sendPushNotification = sendPushNotification;
module.exports.sendEmail = sendEmail;
module.exports.testApiGwConnection = testApiGwConnection;