module.exports = {
    roots: ["<rootDir>/src"],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
    /* Tells jest to use ts-jest for ts/tsx files*/
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.svg$": "jest-svg-transformer",
    },
    globals: {
        "ts-jest": {
            tsconfig: "jest.tsconfig.json",
        },
    },
    moduleNameMapper: {
        /* Mocking all style related files so that we don't need to configure Jest to handle scss */
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/stylemock.js",
    },
    setupFiles: ["./src/jest.setup.js"],
};
