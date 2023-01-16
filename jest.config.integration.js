module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  testMatch: ['**/persistence/**/*.test.ts']
};
