describe('Test checkCredentials', () => {

    let pgCommonServicesApi;
    let mockAWS = {};

    beforeAll(() => {
        jest.mock('aws-sdk', () => {
            return mockAWS;
        });
        pgCommonServicesApi = require("./pg-common-services-api");
    });

    beforeEach(() => {
        jest.resetAllMocks();
    })

    test('should resolve if credentials exists', async () => {
        mockAWS.config = {
            credentials: {}
        };

        let result = await pgCommonServicesApi.checkCredentials();

        expect(result).toEqual(true);
    });

    test('should load remote credential if credentials does not exist', async () => {
        mockAWS.config = {
            credentials: null
        };
        let jestFn = jest.fn();
        mockAWS.RemoteCredentials = function () {
            return {
                load: function (callback) {
                    jestFn();
                    callback(null, {});
                }
            }
        };

        let result = await pgCommonServicesApi.checkCredentials();

        expect(result).toEqual(true);
        expect(jestFn).toHaveBeenCalledTimes(1);
    });

    test('should load credential if current one expired', async () => {
        mockAWS.config = {
            credentials: {
                AccessKey: "123",
                SecretKey: "456",
                expired: true
            }
        }
        const spy = jest.spyOn(pgCommonServicesApi, "loadEcsCredentials").mockReturnValue();

        await pgCommonServicesApi.checkCredentials();

        expect(spy).toHaveBeenCalledTimes(1);
    })

    test('should not load credential if there is one not expired', async () => {
        mockAWS.config = {
            credentials: {
                AccessKey: "123",
                SecretKey: "456",
                expired: false
            }
        }
        const spy = jest.spyOn(pgCommonServicesApi, "loadEcsCredentials").mockReturnValue();

        await pgCommonServicesApi.checkCredentials();

        expect(spy).toHaveBeenCalledTimes(0);
    })

})