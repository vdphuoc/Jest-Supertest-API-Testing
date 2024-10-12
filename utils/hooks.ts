import request from 'supertest';
import { appConfig } from '../config/appConfig';
import { getHeaders } from '../config/headerConfig';
import { getTestCaseData } from './common';
import testCases from '../data/info.json';
import { set } from '../config/shareData';

const baseUrl = appConfig.baseUrl;

// Function to handle the setup logic and fetch Bearer token
export const setupBeforeAll = () => {
  beforeAll(async () => {
    const tc2Data = getTestCaseData(testCases, 'Verify that posts bearer token');
    const requestBody = tc2Data.body;

    const response = await request(baseUrl)
      .post(tc2Data.url)
      .set(getHeaders())
      .send(requestBody);

    // Store the Bearer token in shared state
    const bearerToken = response.body.token;
    set('bearerToken', bearerToken);
    
    //console.log(`Bearer token shared in setup: ${bearerToken}`);

    // Basic validation of the response
    if (response) {
      expect(response.statusCode).toBe(tc2Data.expectedStatus);
      expect(response.body.status).toContain(tc2Data.expectedMessage.status);
      expect(response.body.result).toContain(tc2Data.expectedMessage.result);
    }
  });
};
