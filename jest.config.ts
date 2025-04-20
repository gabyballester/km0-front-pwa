import type { Config } from 'jest';

const config: Config = {
  rootDir: './',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__test__/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/__test__/__mocks__/styleMock.ts',
    '\\.(gif|ttf|eot|png|svg)$': '<rootDir>/src/__test__/__mocks__/fileMock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^default-mock$': '<rootDir>/src/__test__/__mocks__/default-mock.tsx' // Agregar mock
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transformIgnorePatterns: [
    '/node_modules/(?!(react-router|@testing-library)/)' // Asegura transpilar estas dependencias
  ]

  //si uso toastify
  // transformIgnorePatterns: ['/node_modules/(?!react-toastify)']

  // Para resolución de módulos
  // moduleDirectories: ['node_modules', '<rootDir>/src']
};

export default config;
