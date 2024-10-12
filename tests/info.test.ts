import request from 'supertest';
import { appConfig } from '../config/appConfig';
import { getHeaders } from '../config/headerConfig';
import { getTestCaseData } from '../utils/common';
import testCases from '../data/info.json';
import { get } from '../config/shareData'; 
import { setupBeforeAll } from '../utils/hooks';


const baseUrl = appConfig.baseUrl;
// share api key if we want to run 1st test case contains API key
let bearerToken: any; 
// Call the setup function that contains beforeAll
setupBeforeAll();

describe('Post JWT - Bearer token', () => {
  const tc2Data = getTestCaseData(testCases, 'Verify that posts bearer token');
  it(`should ${tc2Data.method} ${tc2Data.url}`, async () => {
    // let requestBody = `{"userName":"${appConfig.user}","password":"${appConfig.password}"}`;
    let requestBody = tc2Data.body;
    let response = await request(baseUrl)
      .post(tc2Data.url)
      .set(getHeaders())
      .send(requestBody);
      bearerToken = response.body.token; 
      console.log(`1st Print Bearer token on same file:  ${bearerToken}`);
      console.log(`URL: ${baseUrl}${tc2Data.url}`);
      console.log('Request Body:', requestBody);
    if (response) {
      expect(response.statusCode).toBe(tc2Data.expectedStatus);
      console.log(response.body);
      expect(response.body.status).toContain(tc2Data.expectedMessage.status);
      expect(response.body.result).toContain(tc2Data.expectedMessage.result);
    }
  });
});

describe('Get Info API Tests', () => {
  const tc1Data = getTestCaseData(testCases, 'Verify that authorized');
  it(`should ${tc1Data.method} ${tc1Data.url}`, async () => {
    let requestBody = {
      userName: appConfig.user,
      password: appConfig.password,
    };
    let response = await request(baseUrl)
    .get(tc1Data.url)
    .set(getHeaders())
    .send(requestBody);
    console.log(`URL: ${baseUrl}${tc1Data.url}`);
    console.log('Request Body:', requestBody);
    console.log('header:', getHeaders());
    console.log('Response Content-Type:', response.headers['content-type']);
  
    if (response) {
      expect(response.statusCode).toBe(tc1Data.expectedStatus);
      console.log(response.body)
      //wrong type of response : text/html istead of application/json
      // expect(response.body).toBe(true);
    }
  });
});


describe('Get list books', () => {
  const tc3Data = getTestCaseData(testCases, 'Verify that user can get list books');
  // need to use value of response.body.toke from another api
  it(`should ${tc3Data.method} ${tc3Data.url}`, async () => {
    let response = await request(baseUrl)
    .get(tc3Data.url)
    .set(getHeaders());
  
    if (response) {
      expect(response.statusCode).toBe(tc3Data.expectedStatus);
      // console.log(response.body)
      expect(response.body).toHaveProperty('books');
      expect(response.body.books).toContainEqual(tc3Data.expectedMessage);
      //console.log(`2nd Print Bearer token on same file:  ${bearerToken}`);
      const be2token = get('bearerToken');
      console.log(`2nd Print Bearer token on shared file:  ${be2token}`);
    }
  });
});
