module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  /* Tells jest to use ts-jest for ts/tsx files*/
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "globals": {
    "ts-jest": {
      "tsconfig": "jest.tsconfig.json"
    }
  },
  "moduleNameMapper":{
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/stylemock.js",
  }
}