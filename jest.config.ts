
module.exports = {
    fakeTimers: {
        timerLimit: 1000
      },
    clearMocks: true,
    verbose: true,
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/html-comment',
    ],
    testMatch: [
        '<rootDir>/src/app/**/*.spec.ts',
        '!<rootDir>/src/assets/**',
        '!**/node_modules/**',
        '!**/coverage/**',
        '!**/cypress/**'
    ],
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.html$',
        }
    },
    transform: {
        '^.+\\.(ts|js|html|tsx|jsx|mjs)$': 'jest-preset-angular',
    },
    // testEnvironment: 'jest-environment-jsdom-fifteen',
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    coveragePathIgnorePatterns: ['/node_modules/', '/modules/*.*/'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!.*\\.mjs$|)'],
    roots: [
        '<rootDir>'
    ],
};