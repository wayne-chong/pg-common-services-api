const pg = require("pg-common-services-api");
require("dotenv").config();

// number of push notification payload
const NUM_PAYLOAD = process.env.NUM_PAYLOAD || 3;
// endpoint to call
const ENDPOINT = process.env.PN_ENDPOINT || process.env.QE_ENDPOINT;
const HOST = process.env.HOST;
const IOS_PUSH_TOKEN_CSV = process.env.IOS_PUSH_TOKEN_CSV || "mockIosPushToken";
const ANDROID_PUSH_TOKEN_CSV = process.env.ANDROID_PUSH_TOKEN_CSV || "mockAndroidPushToken";

const GENERIC_PUSH_PARAM = {
    "notification": {
        "android_channel_id": "pg-channel",
        "priority": "high",
        "badge": "0"
    },
    "data": {
        "type": "new_announcement",
        "payload": "1"
    }
}

async function test() {
    const configs = {
        endpoint: ENDPOINT,
        sign: true,
        credentialProvider: "credentials"
    }
    if (!!HOST) {
        configs.host = HOST;
    }
    pg.config(configs);

    const pushTokens = generatePushToken();
    const pushPayload = GENERIC_PUSH_PARAM;
    const params = { pushPayload, pushTokens };

    const messageAttributes = {
        "transactionId": 1,
        "event": "dueDate",
        "metadata": { "test": "abc" }
    }

    const failures = [];

    for (let i = 1; i <= NUM_PAYLOAD; i++) {
        params.pushPayload.notification.title = "title: " + i;
        params.pushPayload.notification.body = "data: " + i;
        const pushNotification = { params, messageAttributes };
        const result = await pg.sendPushNotification(pushNotification);
        if (result.resultCode >= 300) {
            failures.push(result);
        }
    }
    console.log("Push Result: ")
    if (failures.length > 0) {
        console.log("Some failures when calling push notificaiton API gateway: ");
        console.log("Number of failures: ", failures.length);
        console.log(failures);
    } else {
        console.log("All calls to push notification API gateway successful")
    }
}

test();

// =============================================================================
// helper functions
// =============================================================================
function generatePushToken() {
    const pushTokensAndroid = typeof ANDROID_PUSH_TOKEN_CSV === "string" ? ANDROID_PUSH_TOKEN_CSV.split(",") : [];
    const pushTokensIos = typeof IOS_PUSH_TOKEN_CSV === "string" ? IOS_PUSH_TOKEN_CSV.split(",") : [];

    const pushTargetsAndroid = pushTokensAndroid.map((pushToken, index) => ({
        pushToken,
        parentId: "PARENT" + index,
        deviceOS: "android",
        deviceModel: "test device",
    }))

    const pushTargetsIos = pushTokensIos.map((pushToken, index) => ({
        pushToken,
        parentId: "PARENT" + index,
        deviceOS: "ios",
        deviceModel: "test device"
    }))

    const pushTargets = pushTargetsAndroid.concat(pushTargetsIos);

    if (pushTargets.length > 1000) {
        throw new Error("number of push targets is more than max of 1000 per payload: ", pushTargets.length)
    }

    return pushTargets;
}
