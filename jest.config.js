module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/unit/__mocks__/styleMock.js',
  },
  testMatch: ['**/tests/unit/**/*.test.js'],
};
