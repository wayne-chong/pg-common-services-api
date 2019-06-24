import * as CredentialsUtil from "../CredentialsUtil";
import * as AWS from "aws-sdk";
import { getDateAtLaterMinute } from "util/DateUtil";
import * as envConfigs from "envConfigs";

describe('CredentialsUtils', () => {
    afterEach(() => jest.restoreAllMocks())

    describe('When initial credentials exists and its unexpired', () => {
        it('should just use the initial credentials', async () => {
            const initialCredentials = { accessKeyId: "initialKey", expired: false, expireTime: getDateAtLaterMinute(30) } as AWS.Credentials;
            AWS.config.credentials = initialCredentials;

            await CredentialsUtil.checkCredentials();

            expect(AWS.config.credentials).toEqual(initialCredentials);
        });
    });

    describe('When initial credentials exists and its expired', () => {
        describe('When process is run in ECS container', () => {
            it('should fetch credentials using AWS.RemoteCredentials', async () => {

                jest.spyOn(envConfigs, "getEnvVars").mockReturnValue({ awsContainerCredRelativeUri: "mockUri" })
                const initialCredentials = { accessKeyId: "initialKey", expired: false, expireTime: getDateAtLaterMinute(4.9) } as AWS.Credentials;
                const remoteCredentials = { accessKeyId: "remoteKey", expired: false, expireTime: getDateAtLaterMinute(30), getPromise: jest.fn() }
                AWS.config.credentials = initialCredentials;
                jest.spyOn(AWS as any, "RemoteCredentials").mockImplementation(() => remoteCredentials);

                await CredentialsUtil.checkCredentials();

                expect(AWS.config.credentials).toEqual(remoteCredentials);

            });
        });

        describe('When process is not run in ECS container', () => {
            it('should fetch credentials using AWS.EC2MetadataCredentials', async () => {
                jest.spyOn(envConfigs, "getEnvVars").mockReturnValue({ awsContainerCredRelativeUri: undefined, awsContainerCredFullUri: undefined })

                const initialCredentials = { accessKeyId: "initialKey", expired: false, expireTime: getDateAtLaterMinute(4.9) } as AWS.Credentials;
                const EC2MetadataCredentials = { accessKeyId: "EC2MetadataKey", expired: false, expireTime: getDateAtLaterMinute(30), getPromise: jest.fn() }
                AWS.config.credentials = initialCredentials;
                jest.spyOn(AWS as any, "EC2MetadataCredentials").mockImplementation(() => EC2MetadataCredentials);

                await CredentialsUtil.checkCredentials();

                expect(AWS.config.credentials).toEqual(EC2MetadataCredentials);

            });
        });


    });
});