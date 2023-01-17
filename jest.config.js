module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/(.*)/persistence/(.*)']
};
