/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["dotenv/config", "./jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testMatch: ["**/**/__tests__/*.spec.ts"],
  moduleNameMapper: {
    "^@providers/(.*)$": "<rootDir>/src/providers/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@mocks/(.*)$": "<rootDir>/src/mocks/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@repositories/(.*)$": "<rootDir>/src/repositories/$1",
    "^@useCases/(.*)$": "<rootDir>/src/useCases/$1",
    "^@data/(.*)$": "<rootDir>/src/providers/data/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
