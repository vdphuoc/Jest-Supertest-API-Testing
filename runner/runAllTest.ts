import { exec } from 'child_process';
process.env.GENERATE_HTML_REPORT = 'true';
exec('npx jest --detectOpenHandles', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error running tests: ${stderr}`);
        process.exit(1);
    }
    console.log(stdout);
});

//ts-node .\runner\runAllTest.ts