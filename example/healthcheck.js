const pg = require("pg-common-services-api")
require("dotenv").config();

async function healthcheck() {

    await pg.config({
        endpoint: process.env.DEV_ENDPOINT,
        sign: true
    })
    const qePushNotifData = await pg.sendPushNotification({
        "params": {
            "pushTokens": [
                {
                    "parentId": "fakeId",
                    "pushToken": "fakeToken",
                    "deviceOS": "ios",
                    "deviceModel": "iPhone 8"
                },
            ],
            "pushPayload": {
                "notification": {
                    "title": "Test Annoucement",
                    "body": "PN common service",
                    "android_channel_id": "pg-channel",
                    "priority": "high",
                    "badge": "0"
                },
                "data": {
                    "type": "new_announcement",
                    "payload": "1"
                }
            }
        },
        "messageAttributes": {
            "transactionId": 1,
            "event": "dueDate",
            "metadata": { "test": "abc" }
        }
    })

    if (qePushNotifData.resultCode !== "200") {
        throw new Error("------API GATEWAY PN SERVICE NOT HEALTHY------")
    }
    console.log("------API GATEWAY PN SERVICE HEALTHY------")
}

healthcheck().catch((e) => { console.log(e); process.exit(1) });
