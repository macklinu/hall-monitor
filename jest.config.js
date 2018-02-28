module.exports = {
  projects: [
    Object.assign({ displayName: 'test' }, require('mdu-scripts/jest')),
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/src/**/*.js'],
    },
  ],
}
