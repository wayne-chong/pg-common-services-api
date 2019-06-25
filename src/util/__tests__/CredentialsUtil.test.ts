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

    describe('When credentials is expired', () => {
        it('should get credentials from provider', async () => {
            const initialCredentials = { accessKeyId: "initialKey", expired: false, expireTime: getDateAtLaterMinute(4.9) } as AWS.Credentials;
            const providerCredentials = { accessKeyId: "remoteKey", expired: false, expireTime: getDateAtLaterMinute(30), getPromise: jest.fn() }
            AWS.config.credentials = initialCredentials;
            jest.spyOn(AWS as any, "CredentialProviderChain").mockImplementation(() => ({ resolvePromise: () => providerCredentials }));

            await CredentialsUtil.checkCredentials();

            expect(AWS.config.credentials).toEqual(providerCredentials);
        });
    });
});