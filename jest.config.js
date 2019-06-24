module.exports = {
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
    ],
    coverageDirectory: "<rootDir>/coverage",
    transform: {
        ".(js|ts|jsx|tsx)$": "ts-jest",
    },
    testMatch: [
        "<rootDir>/src/**/?(*.)(spec|unit|test).(js|ts)?(x)",
    ],
    modulePaths: [
        "src",
    ],
    moduleFileExtensions: [
        "ts",
        "js",
        "jsx",
        "tsx",
    ],
    testResultsProcessor: "./node_modules/jest-bamboo-formatter",
    verbose: true,
    bail: true,
};