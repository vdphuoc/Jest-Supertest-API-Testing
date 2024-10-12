import request from 'supertest';
import { appConfig } from '../config/appConfig';
import { getHeaders } from '../config/headerConfig';


const baseUrl = appConfig.baseUrl;

// Function to delete book
export const deleteBook = async (dataDelete:any) => {
  let response = await request(baseUrl).delete(dataDelete.url).set(getHeaders()).send(dataDelete.body);
  console.log(`URL: ${baseUrl}${dataDelete.url}`);
  console.log('Header:', getHeaders());
  if (response) {
    expect(response.status).toBe(dataDelete.expectedStatus);
    expect(response.body).toStrictEqual(dataDelete.expectedMessage);
  }
};