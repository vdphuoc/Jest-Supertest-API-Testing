/** @type {import('ts-jest').JestConfigWithTsJest} **/
const path = require('path');
const fs = require('fs');

// Function to generate current date (YYYY-MM-DD)
const generateCurrentDate = () => new Date().toISOString().split('T')[0];

// Function to generate timestamp
const generateTimestamp = () => new Date().toISOString().replace(/[:.]/g, '-');

// Function to determine the suite name
const getSuiteName = () => {
  const testSuite = process.argv.find(arg => arg.includes('.test.ts'));
  return testSuite ? path.basename(testSuite, '.test.ts') : 'All_tests';
};

// Generate timestamp and report directory
const currentDate = generateCurrentDate();
const timestamp = generateTimestamp();
const suiteName = getSuiteName();
const reportDirectory = path.join(__dirname, 'reports', `${currentDate}_Report`);

// Ensure the report directory exists
if (!fs.existsSync(reportDirectory)) {
  fs.mkdirSync(reportDirectory, { recursive: true });
}

// const shouldGenerateHtmlReport = false;
const shouldGenerateHtmlReport = process.env.GENERATE_HTML_REPORT === 'true' ? true : false;

console.log('Should generate HTML report:', shouldGenerateHtmlReport);

module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  // testMatch: ["**/?(*.)+(test).ts"],
  verbose: true,
  forceExit: true,
  testTimeout: 10000,
  reporters: [
    "default",
    ...(
      shouldGenerateHtmlReport ?
        [
          ["jest-html-reporter",
            {
              "pageTitle": `${suiteName} Test Report`,
              "outputPath": path.join(reportDirectory, `${suiteName}_Suite_${timestamp}.html`),
              "includeFailureMsg": true,
              "includeConsoleLog": true
            }
          ]
        ] : []
    )
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
