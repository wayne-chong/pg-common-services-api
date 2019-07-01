const pg = require("../dist/index");
require("dotenv").config();

async function test() {
    pg.config({
        endpoint: process.env.LOAD_TEST_ENDPOINT,
        sign: true,
        credentialProvider: "credentials"
    });

    const pushTokens = [];
    const fakePushTarget = {
        "parentId": "PARENT1",
        "pushToken": "chvDlyk6VmY:APA91bFcMvEI-NnmD-rm0Kn4O9x-_54r0zYfdbcDG3cJWhEkfUgvRJu3l8jl8L0VNR0YhWUEvgDfa5sSX5c74giSEptY9m6kQXg_CorpKSLR3Rb22dQERZh4jXp6vxuTCRStYsvgPRbI",
    }

    const pushAndroid = {
        ...fakePushTarget,
        "deviceOS": "android",
        "deviceModel": "Samsung S8"
    }
    const pushiOS = {
        ...fakePushTarget,
        "deviceOS": "ios",
        "deviceModel": "iPhone 8"
    }


    for (var i = 0; i < 40; i++) {
        if (i % 2 === 0) {
            pushTokens.push(pushiOS);
        } else {
            pushTokens.push(pushAndroid);
        }
    }

    const pushPayload = {
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
    const params = { pushPayload, pushTokens };

    const messageAttributes = {
        "transactionId": 1,
        "event": "dueDate",
        "metadata": { "test": "abc" }
    }

    const failures = [];

    for (let i = 0; i < 3; i++) {
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