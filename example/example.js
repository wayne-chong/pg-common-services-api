const pg = require("../dist/index")
require("dotenv").config();

async function test() {
    await pg.config({
        endpoint: process.env.QE_ENDPOINT,
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
        endpoint: process.env.DEV_ENDPOINT,
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

    // await pg.config({
    // // using dev api-gateway endpoint
    //     endpoint: ,
    //     sign: true,
    //     stage: "dev",
    // })
    // let data3 = await pg.sendPushNotification({
    //     "params": {
    //         "pushTokens": [
    //             {
    //                 "parentId": "00000001642304",
    //                 "pushToken": "fTDJMzyBI2A:APA91bHX3FMjJoKIYqMUIs4TNv2WxdFD-sZ7UIRK3-aoSaKTgnOXWC8SP5ijWCKdlVvk1a9ClzF3WYy_2T-QC9qzCFdTNLLZpYUsna80huiprWGBu_RkDVviwK0a-yHl_9WelbsNksfV",
    //                 "deviceOS": "ios",
    //                 "deviceModel": "iPhone 8"
    //             },
    //             {
    //                 "parentId": "00000001642305",
    //                 "pushToken": "d7_ItbEc47s:APA91bHvSTzIEf1RZNUPYtVvHUhbnED6jckoERfnRG_Zg3WiUky-Ier4sp5uc1RY7QwPmOpR814eqNJpqej2ODzZhm2Is5zRMo2WPGXrrnghDjflcSkcCUfIBYKlztp36NSmDsgmjmb0",
    //                 "deviceOS": "android",
    //                 "deviceModel": "Nexus 6"
    //             }
    //         ],
    //         "pushPayload": {
    //             "notification": {
    //                 "title": "Test Annoucement DEMO hehe",
    //                 "body": "PN common service",
    //                 "android_channel_id": "pg-channel",
    //                 "priority": "high",
    //                 "badge": "0"
    //             },
    //             "data": {
    //                 "type": "new_announcement",
    //                 "payload": "1"
    //             }
    //         }
    //     },
    //     "messageAttributes": {
    //         "transactionId": 1,
    //         "event": "dueDate",
    //         "metadata": { "test": "abc" }
    //     }
    // })

    // console.log(data3);

    /////////////////////////////////////////
    //VPCE call can only be made within VPC//
    /////////////////////////////////////////
    // await pg.config({
    //     endpoint: process.env.DEV_VPC_EP (not implemented),
    //     sign: false,
    //     private: true,
    //     stage: "dev2",
    //     host: process.env.DEV_ENDPOINT_PTE
    // })
    // let data4 = await pg.sendPushNotification({});
    // console.log(data4);

    // await pg.config({
    //     endpoint: process.env.DEV_VPC_EP (not implemented),
    //     sign: true,
    //     private: true,
    //     stage: "dev2",
    //     host: process.env.DEV_ENDPOINT_PTE
    // })
    // let data5 = await pg.sendPushNotification({});
    // console.log(data5);
}

test();