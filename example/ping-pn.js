const pg = require("pg-common-services-api")
require("dotenv").config();

// process.argv[0] is node and 1 is the .js file path
const API_GATEWAY_URL = process.argv[2];
const PUSH_TOKEN = process.argv[3] || "fake_token";
const CREDENTIAL_PROVIDER = process.argv[4];
const STAGE = process.argv[5] || null;
const PRIVATE = process.argv[6] || false;
const HOST = process.argv[7] || null;

async function healthcheck() {
    const endpoint = API_GATEWAY_URL;
    await pg.config({
        endpoint,
        sign: true,
        private: PRIVATE,
        stage: STAGE,
        host: HOST,
        credentialProvider: CREDENTIAL_PROVIDER
    })
    const pushNotifData = await pg.sendPushNotification({
        "params": {
            "pushTokens": [
                {
                    "parentId": "fakeId",
                    "pushToken": PUSH_TOKEN,
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
            "sessionId": "session",
            "metadata": { "test": "abc" }
        }
    })


    if (pushNotifData.resultCode !== "200") {
        throw new Error(`------ FAILED TO CALL API GATEWAY PN SERVICE------`, pushNotifData)
    }
    console.log(`------ SUCCESSFULLY CALLED API GATEWAY PN SERVICE------`)
    console.log(JSON.stringify(pushNotifData))
}

healthcheck().catch((e) => { console.log(e); process.exit(1) });
