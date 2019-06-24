const MOCK_HOST = "mockHost";

module.exports = {
    config: { credentials: {} },
    HttpRequest: jest.fn().mockImplementation(() => ({
        region: {},
        headers: {},
    })),
    NodeHttpClient: jest.fn().mockImplementation(() => ({
        handleRequest: jest.fn().mockImplementation((_, __, callback) => {

        }),
    })),
    Endpoint: jest.fn().mockImplementation(() => ({ host: MOCK_HOST })),
    RemoteCredentials: jest.fn().mockImplementation(function () {
        return {
            getPromise: jest.fn(),
        }
    }),
    EC2MetadataCredentials: jest.fn().mockImplementation(function () {
        return {
            getPromise: jest.fn(),
        }
    }),
    Signers: {
        V4: jest.fn().mockImplementation(function () {
            return {
                addAuthorization: jest.fn()
            }
        })
    }
};
