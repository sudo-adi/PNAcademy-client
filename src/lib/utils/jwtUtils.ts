import axios from 'axios'
import { getRefreshToken, saveTokens, clearTokens, getAccessToken } from './tokenManager'

// method to get and save the new accessToken Along with the exisiting refreshToken
export const getNewAccessToken = async (): Promise<string | undefined> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/access-token`, {
      refreshToken: refreshToken
    });
    const { accessToken } = response.data;
    saveTokens(accessToken, refreshToken);
    return accessToken;

  } catch (error) {
    console.error('Failed to refresh access token:', error);
    clearTokens();
    return undefined;
  }
};


// method to decode jwt token
export const getDecodedTokenData = (): any => {
  try {
    const token = getAccessToken();
    // Split the JWT into its three parts
    const payloadBase64 = token!.split('.')[1];
    // Decode the base64 payload
    return JSON.parse(atob(payloadBase64));
  } catch (error) {
    // If an error occurs (e.g., invalid token format), return null
    return null;
  }
};


//  method to check if the token is expired or not
export const isTokenExpired = (token: string): boolean => {
  try {
    // Split the JWT into its three parts
    const payloadBase64 = token.split('.')[1];

    // Decode the base64 payload
    const decodedPayload = JSON.parse(atob(payloadBase64));

    // Extract the expiration time (exp) claim
    const { exp } = decodedPayload;

    // Check if the current time is greater than or equal to the expiration time
    return Date.now() >= exp * 1000;
  } catch (error) {
    // If an error occurs (e.g., invalid token format), consider the token as expired
    return true;
  }
};
