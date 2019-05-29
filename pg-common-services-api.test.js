describe('Test checkCredentials', () => {

    let pgCommonServicesApi;
    let mockAWS = {};

    beforeAll(() => {
        jest.mock('aws-sdk', () => {
            return mockAWS;
        });
        pgCommonServicesApi = require("./pg-common-services-api");
    });

    test('should resolve if credentials exits', async () => {
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
        expect(jestFn).toHaveBeenCalled();
    });

})