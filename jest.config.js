module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: [
        'default', 
        'jest-junit'
    ],
    coverageDirectory: './test-coverage',
    testPathIgnorePatterns: [
        '<rootDir>/dist/',
        '/node_modules/'
    ],
    setupFiles: ['dotenv/config']
};