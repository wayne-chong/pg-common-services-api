const pg = require("@pgateway/common-services-api")
require("dotenv").config();

async function healthcheck() {

    await pg.config({
        endpoint: process.env.DEV_ENDPOINT,
        sign: true
    })
    const qePushNotifData = await pg.sendEmail({
        "params": {
            "ToAddresses": [],
            "BccAddresses": ["success@simulator.amazonses.com", "bounce+19@simulator.amazonses.com", "complaint+20@simulator.amazonses.com"],
            "CcAddresses": [],
            "Subject": "Email service testing",
            "HtmlBody": "<html><body><p>Dear Parent,</p><p>You have received a new Announcement- <br/><br/><strong>Announcement Title</strong> <br/>from <strong>School Name</strong></p><p>To view: <a href=\"\">Open in your Parents Gateway App.</a></p><p>Cheers,<br/>Parents Gateway Team</p><img src=\"https://s3-ap-southeast-1.amazonaws.com/pg-email-test/pg_app-logo_wtitleright.png\" style=\"width:120px;border-radius:8px;\"/><font size=\"2\"><p>You are receiving this email because you have enabled email notifications in your Parents Gateway app. <br/>To stop receiving notifications through email, <a href=\"\">click here to change your settings in the app</a></p></font><font size=\"2\"><p><i>This is an auto-generated e-mail. Please do not reply directly to this email.</i></p></font></body></html>"
        },
        "messageAttributes": {
            "transactionId": "e9dc47e9-eb57-5b57-83ec-12b726ae4441",
            "type": "consentForm"
        }
    });

    if (qePushNotifData.resultCode !== "200") {
        throw new Error("------API GATEWAY EMAIL SERVICE NOT HEALTHY------")
    }
    console.log("------API GATEWAY EMAIL SERVICE HEALTHY------")
}

healthcheck().catch((e) => { console.log(e); process.exit(1) });
