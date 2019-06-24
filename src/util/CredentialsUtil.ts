import * as AWS from "aws-sdk";
import { getDateAtLaterMinute } from "./DateUtil";
import { getEnvVars } from "envConfigs";

export async function checkCredentials(): Promise<void> {
    if (!AWS.config.credentials || isAWSCredentialsExpired()) {
        await loadCredentials();
    }
}

async function loadCredentials(): Promise<void> {
    const configs = { httpOptions: { timeout: 5000 }, maxRetries: 10 }
    const { awsContainerCredFullUri, awsContainerCredRelativeUri } = getEnvVars();

    if (!!awsContainerCredFullUri || !!awsContainerCredRelativeUri) {
        AWS.config.credentials = new AWS.RemoteCredentials(configs);
    } else {
        AWS.config.credentials = new AWS.EC2MetadataCredentials(configs);
    }

    await (AWS.config.credentials as AWS.Credentials).getPromise();
}

function isAWSCredentialsExpired() {
    return (AWS.config.credentials as AWS.Credentials).expired
        // [DY] note: expireTime is a Date object with UTC time e.g. 2019-06-20T12:18:49.000Z
        || (AWS.config.credentials as AWS.Credentials).expireTime == null
        // 5 minutes based on AWS docs:https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
        || (AWS.config.credentials as AWS.Credentials).expireTime < getDateAtLaterMinute(5)
}
