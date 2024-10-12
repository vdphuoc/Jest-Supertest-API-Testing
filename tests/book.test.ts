import request from 'supertest';
import { appConfig } from '../config/appConfig';
import { getHeaders } from '../config/headerConfig';
import { getTestCaseData } from '../utils/common';
import testCases from '../data/book.json';
import { deleteBook } from '../utils/deleteBook';

const baseUrl = appConfig.baseUrl;

describe('Verify that user can add book', () => {
  const data = getTestCaseData(testCases, 'Verify that user can add book 1');
  it(`Step 1 : Verify that user can add book 1`, async () => {
    let response = await request(baseUrl).post(data.url).set(getHeaders()).send(data.body);
    console.log(`URL: ${baseUrl}${data.url}`);
    console.log('Header:', getHeaders());
    if (response) {
      expect(response.status).toBe(data.expectedStatus);
      expect(response.body).toStrictEqual(data.expectedMessage);
    }
  });
  it(`Step 2 : Verify that delete data`, async () => {
    const dataDelete = data.afterTest;
    let response = await request(baseUrl).delete(dataDelete.url).set(getHeaders()).send(dataDelete.body);
    console.log(`URL: ${baseUrl}${dataDelete.url}`);
    console.log('Header:', getHeaders());
    if (response) {
      expect(response.status).toBe(dataDelete.expectedStatus);
      // console.log(response.body)
      expect(response.body).toStrictEqual(dataDelete.expectedMessage);
    }
  });
});

describe('Verify that user can add book 2', () => {
  const data = getTestCaseData(testCases, 'Verify that user can add book 2');
  it(`Step 1 : Verify that user can add book 2`, async () => {
    let response = await request(baseUrl).post(data.url).set(getHeaders()).send(data.body);
    console.log(`URL: ${baseUrl}${data.url}`);
    console.log('Header:', getHeaders());
    if (response) {
      expect(response.status).toBe(data.expectedStatus);
      expect(response.body).toStrictEqual(data.expectedMessage);
    }
  });
  afterEach(async () => {
    // Run delete step after each test
    await deleteBook(data.afterTest);
  });
});
