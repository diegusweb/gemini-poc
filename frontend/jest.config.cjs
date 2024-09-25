module.exports = {
    // ... other Jest configuration
    preset: 'ts-jest', // Use ts-jest to run tests written in TypeScript
    testEnvironment: 'jsdom', 
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    }
  };