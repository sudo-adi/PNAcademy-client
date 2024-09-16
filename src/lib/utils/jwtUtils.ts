import axios from 'axios'
import { getRefreshToken, saveTokens, clearTokens, getAccessToken } from './tokenManager'
import { JwtPayloadType } from '../types/jwtTypes';

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
export const getDecodedTokenData = (): JwtPayloadType | null => {
  try {
    const token = getAccessToken(); // Fetch access token
    if (!token) throw new Error('No token found');
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const parsedPayload = JSON.parse(decodedPayload) as JwtPayloadType;
    return parsedPayload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
export const isTokenExpired = (token: string): boolean => {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const { exp } = decodedPayload;
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
};
