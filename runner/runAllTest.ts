import { exec } from 'child_process';
import { appConfig } from '../config/appConfig';
process.env.GENERATE_HTML_REPORT = 'true';

var command = 'npx jest --detectOpenHandles';
if (appConfig.enableParallel === true){
    command = `npx jest --detectOpenHandles --maxWorkers=${appConfig.maxWorkers}`;
}
else{
    command = 'npx jest --detectOpenHandles --runInBand';
}

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error running tests: ${stderr}`);
        process.exit(1);
    }
    console.log(stdout);
});

//ts-node .\runner\runAllTest.ts

// # Run with default parallelism
// npx jest

// # Run with 4 workers
// npx jest --maxWorkers=4

// # Run tests sequentially (no parallel execution)
// npx jest --runInBand