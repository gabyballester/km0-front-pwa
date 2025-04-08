import type { Config } from 'jest';

const config: Config = {
  rootDir: './',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/test/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|png|svg)$': '<rootDir>src/test/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transformIgnorePatterns: ['/node_modules/']

  //si uso toastify
  // transformIgnorePatterns: ['/node_modules/(?!react-toastify)']

  // Para resolución de módulos
  // moduleDirectories: ['node_modules', '<rootDir>/src']
};

export default config;
