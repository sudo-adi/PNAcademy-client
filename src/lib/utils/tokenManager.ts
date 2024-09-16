import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ACCESS_TOKEN_NAME = 'accessToken';
const REFRESH_TOKEN_NAME = 'refreshToken';

const fifteenMinutes = 15 * 60 * 60; // 15 minutes in seconds
const thirtyDays = 30 * 24 * 60 * 60; // 30 days in seconds

export const saveTokens = (accessToken: string, refreshToken: string): void => {
  cookies.set(ACCESS_TOKEN_NAME, accessToken, {
    path: '/',
    sameSite: 'strict',
  });

  // Set refresh token cookie
  cookies.set(REFRESH_TOKEN_NAME, refreshToken, {
    path: '/',
    sameSite: 'strict',
  });
};

export const getAccessToken = (): string | null => {
  return cookies.get(ACCESS_TOKEN_NAME);
};

export const getRefreshToken = (): string | null => {
  return cookies.get(REFRESH_TOKEN_NAME);
};

export const clearTokens = (): void => {
  // Clear access token cookie
  cookies.remove(ACCESS_TOKEN_NAME, { path: '/' });
  // Clear refresh token cookie
  cookies.remove(REFRESH_TOKEN_NAME, { path: '/' });
};

export const clearAccessTokens = (): void => {
  // Clear access token cookie
  cookies.remove(ACCESS_TOKEN_NAME, { path: '/' });
};


export const clearRefreshTokens = (): void => {
  // Clear refresh token cookie
  cookies.remove(REFRESH_TOKEN_NAME, { path: '/' });
};