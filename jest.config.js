/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/styleMock.js",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)?$": ["babel-jest"],
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!axios)"],
};
