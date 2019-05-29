const AWS = require('aws-sdk');

let ENDPOINT;
let SIGN = true;
let BASE_PATH = "/api/services/";
let PN_PATH = BASE_PATH + "pushNotifications";
let EMAIL_PATH = BASE_PATH + "email";

function config(options) {
    if (options.endpoint)
        ENDPOINT = new AWS.Endpoint(options.endpoint);
    SIGN = !!options.sign;
}

function checkCredentials() {
    return new Promise(function (resolve, reject) {
        if (AWS.config.credentials) {
            resolve(true);
        } else {
            AWS.config.credentials = new AWS.RemoteCredentials({
                httpOptions: { timeout: 5000 },
                maxRetries: 10,
                retryDelayOptions: { base: 200 }
            });
            AWS.config.credentials.load((err, credential) => {
                if (!err) {
                    console.debug("AWS SDK remote credential ready...")
                    resolve(true);
                } else {
                    reject(err.message)
                }
            })
        }
    });
}

async function signAndSendRequest(path, payload) {

    let request = new AWS.HttpRequest(ENDPOINT);
    request.method = "POST";
    request.path = path;
    request.region = "ap-southeast-1";
    request.headers["presigned-expires"] = false;
    request.headers["Host"] = ENDPOINT.host;
    request.body = JSON.stringify(payload);
    if (SIGN) {
        await checkCredentials();
        const signer = new AWS.Signers.V4(request, "execute-api");
        signer.addAuthorization(AWS.config.credentials, new Date());
    }
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


sendPushNotification = (payload) => {
    return signAndSendRequest(PN_PATH, payload);
}


sendEmail = (payload) => {
    return signAndSendRequest(EMAIL_PATH, payload);
}

module.exports.config = config;
module.exports.checkCredentials = checkCredentials;
module.exports.sendPushNotification = sendPushNotification;
module.exports.sendEmail = sendEmail;