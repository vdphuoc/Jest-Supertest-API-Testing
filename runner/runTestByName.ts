import { exec } from 'child_process';

process.env.GENERATE_HTML_REPORT = 'true';
const testName = process.argv[2]; // Get the test name from the command line

if (!testName) {
    console.error('Please provide a test name to run.');
    process.exit(1);
}

const testFile = `tests/${testName.toLowerCase()}.test.ts`; // Create the test file path dynamically

exec(`npx jest ${testFile} --detectOpenHandles`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error running test: ${stderr}`);
        process.exit(1);
    }
    console.log(stdout);
});
