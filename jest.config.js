module.exports = {
    preset: 'jest-preset-angular',
    setupTestFrameworkScriptFile: '<rootDir>/src/setup-jest.ts',
    testUrl: 'http://localhost',
    transformIgnorePatterns: ['node_modules/(?!ng2-semantic-ui)'],
    testPathIgnorePatterns : [
        "<rootDir>/src/test.ts" 
    ]
};