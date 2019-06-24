
jest.mock("../util/RequestUtil", () => ({
    sendRequest: jest.fn().mockImplementation(x => x),
}))

import * as pgCommonServicesApi from "../index";

const MOCK_HOST = "mockHost";

const defaultRequest = { headers: { Host: MOCK_HOST }, method: "GET", path: "/", region: {} }

describe('Test pgCommonServicesApi', () => {

    afterEach(() => { jest.clearAllMocks() })

    describe('Sending with configs', () => {
        it('should send with the correct configs', async () => {
            const expectedRequest = { headers: { Host: MOCK_HOST }, method: "GET", path: "/mockStage/", "region": {} };

            pgCommonServicesApi.config({ endpoint: "mock", stage: "mockStage", private: true, host: MOCK_HOST });
            const request = await pgCommonServicesApi.createAndSendRequest("/", "GET")

            expect(request).toEqual(expectedRequest);
        });
    });

    describe('Sending unsigned request', () => {
        it('should send the request succesfully', async () => {
            pgCommonServicesApi.config({ endpoint: "mock", sign: false });

            const request = await pgCommonServicesApi.createAndSendRequest("/", "GET")

            expect(request).toEqual(defaultRequest);
        });
    });

    describe('Sending signed request', () => {
        it('should send successfully', async () => {
            pgCommonServicesApi.config({ endpoint: "mock", sign: true });

            const request = await pgCommonServicesApi.createAndSendRequest("/", "GET");

            expect(request).toEqual(defaultRequest);
        });
    });
});
