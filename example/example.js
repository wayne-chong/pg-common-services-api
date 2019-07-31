const pg = require("pg-common-services-api")
require("dotenv").config();

async function test() {

    await pg.config({
        endpoint: process.env.DEV_ENDPOINT,
        sign: true
    })
    const devData = await pg.sendPushNotification({
        "params": {
            "pushTokens": [
                {
                    "parentId": "00000001642304",
                    "pushToken": "fTDJMzyBI2A:APA91bHX3FMjJoKIYqMUIs4TNv2WxdFD-sZ7UIRK3-aoSaKTgnOXWC8SP5ijWCKdlVvk1a9ClzF3WYy_2T-QC9qzCFdTNLLZpYUsna80huiprWGBu_RkDVviwK0a-yHl_9WelbsNksfV",
                    "deviceOS": "ios",
                    "deviceModel": "iPhone 8"
                },
                {
                    "parentId": "00000001642305",
                    "pushToken": "d7_ItbEc47s:APA91bHvSTzIEf1RZNUPYtVvHUhbnED6jckoERfnRG_Zg3WiUky-Ier4sp5uc1RY7QwPmOpR814eqNJpqej2ODzZhm2Is5zRMo2WPGXrrnghDjflcSkcCUfIBYKlztp36NSmDsgmjmb0",
                    "deviceOS": "android",
                    "deviceModel": "Nexus 6"
                }
            ],
            "pushPayload": {
                "notification": {
                    "title": "Test Annoucement DEMO haha",
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

    console.log("Dev environment:");
    console.log(devData);

    await pg.config({
        endpoint: process.env.QE_ENDPOINT,
        sign: true
    })

    var qeData = await pg.sendPushNotification({
        "params": {
            "pushTokens": [
                {
                    "parentId": "00000001642304",
                    "pushToken": "fTDJMzyBI2A:APA91bHX3FMjJoKIYqMUIs4TNv2WxdFD-sZ7UIRK3-aoSaKTgnOXWC8SP5ijWCKdlVvk1a9ClzF3WYy_2T-QC9qzCFdTNLLZpYUsna80huiprWGBu_RkDVviwK0a-yHl_9WelbsNksfV",
                    "deviceOS": "ios",
                    "deviceModel": "iPhone 8"
                },
                {
                    "parentId": "00000001642305",
                    "pushToken": "d7_ItbEc47s:APA91bHvSTzIEf1RZNUPYtVvHUhbnED6jckoERfnRG_Zg3WiUky-Ier4sp5uc1RY7QwPmOpR814eqNJpqej2ODzZhm2Is5zRMo2WPGXrrnghDjflcSkcCUfIBYKlztp36NSmDsgmjmb0",
                    "deviceOS": "android",
                    "deviceModel": "Nexus 6"
                }
            ],
            "pushPayload": {
                "notification": {
                    "title": "Test Annoucement DEMO haha",
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
    });
    console.log("QE environment:");
    console.log(qeData);

    await pg.config({
        endpoint: process.env.RC_ENDPOINT,
        sign: true
    })
    const rcData = await pg.sendPushNotification({
        "params": {
            "pushTokens": [
                {
                    "parentId": "00000001642304",
                    "pushToken": "fTDJMzyBI2A:APA91bHX3FMjJoKIYqMUIs4TNv2WxdFD-sZ7UIRK3-aoSaKTgnOXWC8SP5ijWCKdlVvk1a9ClzF3WYy_2T-QC9qzCFdTNLLZpYUsna80huiprWGBu_RkDVviwK0a-yHl_9WelbsNksfV",
                    "deviceOS": "ios",
                    "deviceModel": "iPhone 8"
                },
                {
                    "parentId": "00000001642305",
                    "pushToken": "d7_ItbEc47s:APA91bHvSTzIEf1RZNUPYtVvHUhbnED6jckoERfnRG_Zg3WiUky-Ier4sp5uc1RY7QwPmOpR814eqNJpqej2ODzZhm2Is5zRMo2WPGXrrnghDjflcSkcCUfIBYKlztp36NSmDsgmjmb0",
                    "deviceOS": "android",
                    "deviceModel": "Nexus 6"
                }
            ],
            "pushPayload": {
                "notification": {
                    "title": "Test Annoucement DEMO haha",
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

    console.log("RC environment:");
    console.log(rcData);

    await pg.config({
        endpoint: process.env.STABLE_ENDPOINT,
        sign: true
    })
    var stableData = await pg.sendPushNotification({
        "params": {
            "pushTokens": [
                {
                    "parentId": "00000001642304",
                    "pushToken": "fTDJMzyBI2A:APA91bHX3FMjJoKIYqMUIs4TNv2WxdFD-sZ7UIRK3-aoSaKTgnOXWC8SP5ijWCKdlVvk1a9ClzF3WYy_2T-QC9qzCFdTNLLZpYUsna80huiprWGBu_RkDVviwK0a-yHl_9WelbsNksfV",
                    "deviceOS": "ios",
                    "deviceModel": "iPhone 8"
                },
                {
                    "parentId": "00000001642305",
                    "pushToken": "d7_ItbEc47s:APA91bHvSTzIEf1RZNUPYtVvHUhbnED6jckoERfnRG_Zg3WiUky-Ier4sp5uc1RY7QwPmOpR814eqNJpqej2ODzZhm2Is5zRMo2WPGXrrnghDjflcSkcCUfIBYKlztp36NSmDsgmjmb0",
                    "deviceOS": "android",
                    "deviceModel": "Nexus 6"
                }
            ],
            "pushPayload": {
                "notification": {
                    "title": "Test Annoucement DEMO haha",
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

    console.log("Stable environment:");
    console.log(stableData);
}

test();