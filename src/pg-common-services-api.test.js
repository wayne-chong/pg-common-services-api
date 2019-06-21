const { getDateAtLaterMinute } = require("./util/DateUtil");

let mockAWS = {
    config: { credentials: {} },
    HttpRequest: jest.fn().mockImplementation(function () {
        return {
            region: {},
            headers: {},
        }
    }),
    Endpoint: jest.fn(),

};

jest.mock('aws-sdk', () => {
    return mockAWS;
});

let pgCommonServicesApi;
pgCommonServicesApi = require("./pg-common-services-api");

describe('Test checkCredentials', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    })

    test('should load remote credential if credentials does not exist', async () => {
        mockAWS.config = {
            credentials: null
        };
        let jestFn = jest.fn();
        mockAWS.RemoteCredentials = function () {
            return {
                refresh: function (callback) {
                    jestFn();
                    callback(null);
                }
            }
        };

        let result = await pgCommonServicesApi.checkCredentials();

        expect(result).toEqual(true);
        expect(jestFn).toHaveBeenCalledTimes(1);
    });

    test('should load credential if credentials.expired is true', async () => {
        mockAWS.config = {
            credentials: {
                accessKeyId: "123",
                expired: true
            }
        }
        const loadEcsCredentialsSpy = jest.spyOn(pgCommonServicesApi, "loadEcsCredentials").mockReturnValue();

        await pgCommonServicesApi.checkCredentials();

        expect(loadEcsCredentialsSpy).toHaveBeenCalledTimes(1);
    })

    test('should load credentials if credentials.expireTime is null or undefined', async () => {
        mockAWS.config = {
            credentials: {
                accessKeyId: "123",
                expired: false,
                expireTime: undefined,
            }
        }
        const loadEcsCredentialsSpy = jest.spyOn(pgCommonServicesApi, "loadEcsCredentials").mockReturnValue();

        await pgCommonServicesApi.checkCredentials();

        expect(loadEcsCredentialsSpy).toHaveBeenCalledTimes(1);
    });


    test('should load credentials if credentials.expireTime is less than 5 minutes away from the time now', async () => {
        mockAWS.config = {
            credentials: {
                accessKeyId: "123",
                expired: false,
                expireTime: getDateAtLaterMinute(4.9),
            }
        }
        const loadEcsCredentialsSpy = jest.spyOn(pgCommonServicesApi, "loadEcsCredentials").mockReturnValue();

        await pgCommonServicesApi.checkCredentials();

        expect(loadEcsCredentialsSpy).toHaveBeenCalledTimes(1);
    });

    test('should not load remote credential if credentials exists, expired is false, and expireTime is 5 minutes or more away', async () => {
        mockAWS.config = {
            credentials: {
                accessKeyId: "123",
                expired: false,
                expireTime: getDateAtLaterMinute(5),
            }
        }
        const loadEcsCredentialsSpy = jest.spyOn(pgCommonServicesApi, "loadEcsCredentials").mockReturnValue();

        await pgCommonServicesApi.checkCredentials();

        expect(loadEcsCredentialsSpy).toHaveBeenCalledTimes(0);
    })


})

describe('Test request signing', () => {
    const defaultConfigOptions = {
        endpoint: "mock.com",
        sign: false,
        private: false,
        host: undefined,
        stage: undefined,
    };
    beforeEach(() => {
        jest.resetAllMocks();
        mockAWS.HttpRequest = jest.fn().mockImplementation(function () {
            return {
                region: {},
                headers: {},
            }
        });
    })
    describe('If the STAGE var is not set', () => {
        it('should be the original request path', async () => {
            const configOptions = defaultConfigOptions;
            pgCommonServicesApi.config(configOptions);
            const path = "/path";

            const request = await pgCommonServicesApi.testExports.signRequest(path, "GET");

            expect(request.path).toBe(path);
        });
    });

    describe('If STAGE var is set', () => {
        it('should append the STAGE var to the original request path', async () => {
            const configOptions = {
                ...defaultConfigOptions,
                stage: "stage",
            }

            pgCommonServicesApi.config(configOptions);
            const path = "/path";

            const request = await pgCommonServicesApi.testExports.signRequest(path, "GET");

            expect(request.path).toBe("/" + configOptions.stage + path);
        });
    });
    describe('If PRIVATE is true', () => {
        it('should add a Host header containing HOST', async () => {
            const configOptions = {
                ...defaultConfigOptions,
                private: true,
            }
            pgCommonServicesApi.config(configOptions);
            const path = "/path";

            const request = await pgCommonServicesApi.testExports.signRequest(path, "GET");

            expect(request.headers["Host"]).toBe(configOptions.host);
        });
    });
    describe('If SIGN is true', () => {
        const mockAddAuthorization = jest.fn();
        beforeEach(() => {
            mockAWS.Signers = {
                V4: jest.fn().mockImplementation(function () {
                    return ({
                        addAuthorization: mockAddAuthorization,
                    })
                }),
            }

        })
        it('should check credentials', async () => {
            const configOptions = {
                ...defaultConfigOptions,
                sign: true,
            }
            pgCommonServicesApi.config(configOptions);
            const checkCredentialsSpy = jest.spyOn(pgCommonServicesApi, "checkCredentials")

            await pgCommonServicesApi.testExports.signRequest("/path", "GET");

            expect(checkCredentialsSpy).toHaveBeenCalledTimes(1);
        });
        it('should add authorization', async () => {
            const configOptions = {
                ...defaultConfigOptions,
                sign: true,
            }
            pgCommonServicesApi.config(configOptions);

            await pgCommonServicesApi.testExports.signRequest("/path", "GET");

            expect(mockAddAuthorization).toHaveBeenCalledTimes(1);
        });
    });
});
