module.exports = {
  modulePathIgnorePatterns: ['dist'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 83.8,
      statements: 83.8,
    },
  },
};
