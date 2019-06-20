var pg = require("../src/pg-common-services-api")

async function test() {
    await pg.config({
        endpoint: "https://qe-common-sevices-api-pg.dcube.cf",
        sign: true
    })
    var data1 = await pg.sendPushNotification({
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
    console.log(data1);

    await pg.config({
        endpoint: "https://dev-common-sevices-api-pg.dcube.cf",
        sign: true
    })
    var data2 = await pg.sendPushNotification({
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

    console.log(data2);

    await pg.config({
        endpoint: "https://su6uqpbef3.execute-api.ap-southeast-1.amazonaws.com",
        sign: true,
        stage: "dev",
    })
    let data3 = await pg.sendPushNotification({
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
                    "title": "Test Annoucement DEMO hehe",
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

    console.log(data3);

    /////////////////////////////////////////
    //VPCE call can only be made within VPC//
    /////////////////////////////////////////
    // await pg.config({
    //     endpoint: "https://vpce-07f6aa6800aea2c83-6meep72q.execute-api.ap-southeast-1.vpce.amazonaws.com",
    //     sign: false,
    //     private: true,
    //     stage: "dev2",
    //     host: "i4390qzy7k.execute-api.ap-southeast-1.amazonaws.com"
    // })
    // let data4 = await pg.sendPushNotification({});
    // console.log(data4);

    // await pg.config({
    //     endpoint: "https://vpce-07f6aa6800aea2c83-6meep72q.execute-api.ap-southeast-1.vpce.amazonaws.com",
    //     sign: true,
    //     private: true,
    //     stage: "dev2",
    //     host: "i4390qzy7k.execute-api.ap-southeast-1.amazonaws.com"
    // })
    // let data5 = await pg.sendPushNotification({});
    // console.log(data5);
}

test();