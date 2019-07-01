import * as AWS from "aws-sdk";
import { sendRequest } from "./util/RequestUtil";
import { checkCredentials } from "./util/CredentialsUtil";
import { TCredentialProvider } from "./interfaces";

const REGION = "ap-southeast-1";
const BASE_PATH = "/api/services/";
const PN_PATH = BASE_PATH + "pushNotifications";
const EMAIL_PATH = BASE_PATH + "email";
const DEBUG_PATH = BASE_PATH + "debug";

let ENDPOINT: AWS.Endpoint, HOST: string, STAGE: string;
let PRIVATE = false;
let SIGN = true;
let CREDENTIAL_PROVIDER;

export async function config(options: { endpoint: string, sign?: boolean, private?: boolean, host?: string, stage?: string, credentialProvider?: TCredentialProvider }): Promise<void> {
    if (!options.endpoint) {
        throw new Error("endpoint is a required field");
    }
    ENDPOINT = new AWS.Endpoint(options.endpoint);
    SIGN = !!options.sign;
    PRIVATE = !!options.private;
    HOST = options.host;
    STAGE = options.stage;
    CREDENTIAL_PROVIDER = options.credentialProvider
    if (SIGN)
        await checkCredentials(CREDENTIAL_PROVIDER);
}

export function sendPushNotification(payload) {
    return createAndSendRequest(PN_PATH, 'POST', payload);
}

export function sendEmail(payload) {
    return createAndSendRequest(EMAIL_PATH, 'POST', payload);
}

export function testApiGwConnection() {
    return createAndSendRequest(DEBUG_PATH, 'GET');
}

/**
 * Creates and send the request based on input params.
 *
 * Also auto-refetch credentials and make request again if request fails from server error (>=500) or forbidden (403) due to outdated credentials
 * @param path URL path of request
 * @param method HTTP method
 * @param payload JSON object to send
 * @param maxRetries number of retries before throwing
 * @param numberOfRetriesUsed used for recursively calling itself
 */
export async function createAndSendRequest(path: string, method: 'GET' | 'POST', payload?, maxRetries = 2, numberOfRetriesUsed = 0) {
    try {
        const request = await createRequest(path, method, payload);
        return await sendRequest(request);
    } catch (e) {
        if (numberOfRetriesUsed >= maxRetries) {
            throw e;
        }
        return await createAndSendRequest(path, method, payload, maxRetries, ++numberOfRetriesUsed);
    }
}

async function createRequest(path: string, method: 'GET' | 'POST', payload?): Promise<AWS.HttpRequest> {
    const request = new AWS.HttpRequest(ENDPOINT, REGION);
    request.method = method;
    request.path = path;
    request.headers["Host"] = ENDPOINT.host;
    if (!!payload) {
        request.body = JSON.stringify(payload);
    }
    if (STAGE) {
        request.path = `/${STAGE}${request.path}`;
    }
    if (PRIVATE) {
        request.headers["Host"] = HOST;
    }
    if (SIGN) {
        await checkCredentials(CREDENTIAL_PROVIDER);
        // [DY] No typescript declaration for Signers: https://github.com/aws/aws-sdk-js/issues/1729
        const signer = new (AWS as any).Signers.V4(request, "execute-api");
        signer.addAuthorization(AWS.config.credentials, new Date());
    }
    return request;

}
