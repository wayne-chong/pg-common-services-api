const AWS = require('aws-sdk');
const { getDateAtLaterMinute } = require("./util/DateUtil");

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
    if (!options.endpoint) {
        throw new Error("endpoint is a required field");
    }
    ENDPOINT = new AWS.Endpoint(options.endpoint);
    SIGN = !!options.sign;
    PRIVATE = !!options.private;
    HOST = options.host;
    STAGE = options.stage;
    if (SIGN)
        await exports.checkCredentials();
}

function loadEcsCredentials() {
    return new Promise(function (resolve, reject) {
        AWS.config.credentials = new AWS.RemoteCredentials({
            httpOptions: { timeout: 5000 },
            maxRetries: 10,
            retryDelayOptions: { base: 200 }
        });
        AWS.config.credentials.refresh((err) => {
            if (!err) {
                resolve(true);
            } else {
                reject(err.message)
            }
        })
    });
}

function isAWSCredentialsExpired() {
    if (AWS.config.credentials.expired
        // [DY] note: expireTime is a Date object with UTC time e.g. 2019-06-20T12:18:49.000Z
        || AWS.config.credentials.expireTime == null
        /**
         * 5 minutes based on Section Retrieving Security Credentials from Instance Metadata:
         * https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
         */
        || AWS.config.credentials.expireTime < getDateAtLaterMinute(5)
    ) {
        return true;
    }

    return false;
}

async function checkCredentials() {
    if (!AWS.config.credentials || isAWSCredentialsExpired()) {
        return await exports.loadEcsCredentials();
    }
    else
        return true;
}

function isForbiddenRequestOrServerError(response) {
    return response.statusCode === 403 && response.statusCode >= 500;
}

/**
 * Send the request to AWS
 *
 * @returns {Promise} The response body
 * @throws  {message} Promise is rejected with an object e.g. { message: 'The security token included in the request is invalid.' }
 * @param {AWS.HttpRequest} request
 */
function sendRequest(request) {
    const send = new AWS.NodeHttpClient();
    return new Promise((resolve, reject) => {
        send.handleRequest(request, null, function (response) {
            let respBody = "";
            response.on("data", function (chunk) {
                respBody += chunk;
            });
            response.on("end", function () {
                if (isForbiddenRequestOrServerError(response)) {
                    reject(new Error(respBody));
                }
                try {
                    resolve(JSON.parse(respBody));
                } catch (e) {
                    reject(new Error(respBody));
                }
            });
        });
    })
}

async function signRequest(path, method, payload) {
    let request = new AWS.HttpRequest(ENDPOINT);
    request.method = method;
    request.path = path;
    request.region = "ap-southeast-1";
    request.headers["presigned-expires"] = false;
    request.headers["Host"] = ENDPOINT.host;
    request.body = JSON.stringify(payload);
    if (STAGE) {
        request.path = `/${STAGE}${request.path}`;
    }
    if (PRIVATE) {
        request.headers["Host"] = HOST;
    }
    if (SIGN) {
        await exports.checkCredentials();
        const signer = new AWS.Signers.V4(request, "execute-api");
        signer.addAuthorization(AWS.config.credentials, new Date());
    }
    return request;

}

/**
 * Sign and send request, with retry mechanism
 *
 * @param {*} path full URL path
 * @param {string} method "GET" | "POST"
 * @param {*} payload Payload body
 * @param {number} maxRetries Number of retries for signing and sending
 */
async function signAndSendRequest(path, method, payload, maxRetries = 2, numberOfRetriesUsed = 0) {
    try {
        const request = await signRequest(path, method, payload);
        return await sendRequest(request);
    } catch (e) {
        if (numberOfRetriesUsed >= maxRetries) {
            throw e;
        }
        return await signAndSendRequest(path, method, payload, maxRetries, ++numberOfRetriesUsed);
    }
}

function sendPushNotification(payload) {
    return signAndSendRequest(PN_PATH, HTTP_METHOD.POST, payload);
}

function sendEmail(payload) {
    return signAndSendRequest(EMAIL_PATH, HTTP_METHOD.POST, payload);
}

function testApiGwConnection() {
    return signAndSendRequest(DEBUG_PATH, HTTP_METHOD.GET);
}

module.exports.config = config;
module.exports.checkCredentials = checkCredentials;
module.exports.sendPushNotification = sendPushNotification;
module.exports.sendEmail = sendEmail;
module.exports.testApiGwConnection = testApiGwConnection;
module.exports.loadEcsCredentials = loadEcsCredentials;

module.exports.testExports = { signRequest };