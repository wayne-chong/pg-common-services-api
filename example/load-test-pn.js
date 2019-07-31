const pg = require("pg-common-services-api");
require("dotenv").config();

// number of push notification payload
const NUM_PAYLOAD = 3;
// number of devices per payload. Max is 1000
const NUM_DEVICES_PER_PAYLOAD = 5;
// endpoint to call
const ENDPOINT = process.env.QE_ENDPOINT;

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
    pg.config({
        endpoint: ENDPOINT,
        sign: true,
        credentialProvider: "credentials"
    });

    const pushTokens = generatePushToken();
    const pushPayload = GENERIC_PUSH_PARAM;
    const params = { pushPayload, pushTokens };

    const messageAttributes = {
        "transactionId": 1,
        "event": "dueDate",
        "metadata": { "test": "abc" }
    }

    const failures = [];

    for (let i = 0; i < NUM_PAYLOAD; i++) {
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
    const pushTokens = [];
    const fakePushTarget = {
        "parentId": "PARENT1",
        "pushToken": "chvDlyk6VmY:APA91bFcMvEI-NnmD-rm0Kn4O9x-_54r0zYfdbcDG3cJWhEkfUgvRJu3l8jl8L0VNR0YhWUEvgDfa5sSX5c74giSEptY9m6kQXg_CorpKSLR3Rb22dQERZh4jXp6vxuTCRStYsvgPRbI",
    };
    const pushAndroid = {
        ...fakePushTarget,
        "deviceOS": "android",
        "deviceModel": "Samsung S8"
    };
    const pushiOS = {
        ...fakePushTarget,
        "deviceOS": "ios",
        "deviceModel": "iPhone 8"
    };
    for (let i = 0; i < NUM_DEVICES_PER_PAYLOAD; i++) {
        if (i % 2 === 0) {
            pushTokens.push(pushiOS);
        }
        else {
            pushTokens.push(pushAndroid);
        }
    }
    return pushTokens;
}
