import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();

export type ConfigType = {
  API_PORT: number;
  NODE_ENV: string;
  DB_URL: string;
  ACCESS_TOKEN_KEY: string;
  ACCESS_TOKEN_TIME: string;
  REFRESH_TOKEN_KEY: string;
  REFRESH_TOKEN_TIME: string;
  API_URL: string;
};

const requiredVariables = [
  'API_PORT',
  'NODE_ENV',
  'DEV_DB_URL',
  'ACCESS_TOKEN_KEY',
  'ACCESS_TOKEN_TIME',
  'REFRESH_TOKEN_KEY',
  'REFRESH_TOKEN_TIME',
  'LOCAL_API',
  'SERVER_API',
];

const missingVariables = requiredVariables.filter((varebels) => {
  const value = process.env[varebels];
  return !value || value.trim() === '';
});

if (missingVariables.length > 0) {
  Logger.error(
    `Missing or empty required environment variables: ${missingVariables.join(', ')}`,
  );
  process.exit(1);
}

export const config: ConfigType = {
  API_PORT: parseInt(process.env.API_PORT as string, 10),
  NODE_ENV: process.env.NODE_ENV as string,
  DB_URL:
    process.env.NODE_ENV === 'dev'
      ? (process.env.DEV_DB_URL as string)
      : (process.env.PROD_DB_URL as string),
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY as string,
  ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME as string,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY as string,
  REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME as string,
  API_URL:
    process.env.NODE_ENV === 'dev'
      ? (process.env.LOCAL_API as string)
      : (process.env.SERVER_API as string),
};
