module.exports = {
  // Allow to test both backend and frontend by specifying the path
  projects: [
    {
      displayName: 'backend',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/server/**/*.test.js'],
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/**/*.test.js'],
    },
  ],
};

// Rename with the cjs extension to use the module.exports
// Note make the testMatch matches the directory path