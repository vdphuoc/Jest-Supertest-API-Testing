export function getTestCaseData(testCases: any[], testName: string) {
  const testCase = testCases.find((testCase) => testCase.testName === testName);

  if (!testCase) {
      throw new Error(`Test case with name "${testName}" not found`);
  }

  return testCase;
}
