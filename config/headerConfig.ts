import { appConfig } from "./appConfig";

export const getHeaders = (token?: string) => {
  const headers: any = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }else {
    headers['Authorization'] = getBasicAuthHeader();
  }

  return headers;
};

// Function to base64 encode user and password
export const getBasicAuthHeader = () => {
  const credentials = `${appConfig.user}:${appConfig.password}`;
  const encodedCredentials = Buffer.from(credentials).toString('base64');
  return `Basic ${encodedCredentials}`;
};