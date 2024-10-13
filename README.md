## Insall package:

npm install (run once time)

## Run by user (select 1):

1. Run all test cases without report generated:

    jest

   or
   
    npx jest

2. Run tests by Suite name without report generated:

    jest <suite_name> :: jest book.test.ts

3. Run tests with report generated (Prepare for pipeline trigger):

    ts-node ./path/runAllTest.ts

    or

    ts-node ./path/runTestByName.ts
