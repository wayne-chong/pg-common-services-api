import * as AWS from "aws-sdk";
import { getDateAtLaterMinute } from "./DateUtil";
import { getEnvVars } from "envConfigs";


export async function checkCredentials(): Promise<void> {
    if (!AWS.config.credentials || isAWSCredentialsExpired()) {
        await loadCredentials();
    }
}

async function loadCredentials(): Promise<void> {
    const configs = { httpOptions: { timeout: 5000 }, maxRetries: 3 }
    const remoteProvider = () => new AWS.RemoteCredentials(configs);
    const ec2MetadataProvider = () => new AWS.EC2MetadataCredentials(configs);
    const sharedIniFileProvider = () => new AWS.SharedIniFileCredentials({ profile: "default" });
    const providers = [];
    const { awsContainerCredFullUri, awsContainerCredRelativeUri, ec2Home } = getEnvVars();
    if (awsContainerCredFullUri || awsContainerCredRelativeUri) {
        providers.push(remoteProvider)
    }
    if (ec2Home) {
        providers.push(ec2MetadataProvider)
    }
    if (!awsContainerCredFullUri && !awsContainerCredRelativeUri && !ec2Home) {
        providers.push(sharedIniFileProvider)
    }
    const providerChain = new AWS.CredentialProviderChain(providers);
    AWS.config.credentials = await providerChain.resolvePromise();
}

function isAWSCredentialsExpired() {
    return (AWS.config.credentials as AWS.Credentials).expired
        // [DY] note: expireTime is a Date object with UTC time e.g. 2019-06-20T12:18:49.000Z
        || (AWS.config.credentials as AWS.Credentials).expireTime == null
        // 5 minutes based on AWS docs:https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
        || (AWS.config.credentials as AWS.Credentials).expireTime < getDateAtLaterMinute(5)
}
