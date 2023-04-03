// another way: import 'dotenv/config'
import * as dotenv from "dotenv"
dotenv.config({
  path: ".env.dev",
})

if (
  // ######################### APP #########################
  process.env.REST_API_PORT === undefined ||
  process.env.REST_API_URL === undefined ||
  process.env.JWT_SECRET === undefined ||
  process.env.AUTH_PROVIDER_CALLBACK_URL === undefined ||
  process.env.SESSION_COOKIE_NAME === undefined ||
  process.env.MAX_AGE_SESSION_COOKIE === undefined ||
  process.env.EXPIRES_IN_JWT === undefined ||
  // ######################### DATABASE #########################
  process.env.DATABASE_URL === undefined ||
  // ######################### GOOGLE CLOUD PLATFORM #########################
  // ############### CLOUD STORAGE ###############
  process.env.GCP_CLOUD_STORAGE_BUCKET_NAME === undefined ||
  process.env.GCP_CLOUD_STORAGE_JSON_CREDENTIALS_NAME === undefined ||
  // ############### AUTH PROVIDER ###############
  process.env.GCP_AUTH_PROVIDER_OAUTH_CLIENT_ID === undefined ||
  process.env.GCP_AUTH_PROVIDER_OAUTH_CLIENT_SECRET === undefined ||
  // ######################### AMAZON WEB SERVICES #########################
  // ############### S3 Simple Storage Service ###############
  process.env.AWS_S3_BUCKET_REGION === undefined ||
  process.env.AWS_S3_BUCKET_NAME === undefined
) {
  throw new Error("Missing environment variables")
}

// ######################### APP #########################
export const REST_API_PORT = process.env.REST_API_PORT
export const REST_API_URL = process.env.REST_API_URL
export const JWT_SECRET = process.env.JWT_SECRET
// not working
export const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME
export const MAX_AGE_SESSION_COOKIE = Number(process.env.MAX_AGE_SESSION_COOKIE)
export const EXPIRES_IN_JWT = process.env.EXPIRES_IN_JWT
// export const SESSION_COOKIE_NAME = "DEVELOPMENT_ECO_SESSION_COOKIE_NAME"
export const AUTH_PROVIDER_CALLBACK_URL = process.env.AUTH_PROVIDER_CALLBACK_URL

// ######################### DATABASE #########################
export const DATABASE_URL = process.env.DATABASE_URL

// ######################### GOOGLE CLOUD PLATFORM #########################
// ############### CLOUD STORAGE ###############
export const GCP_CLOUD_STORAGE_BUCKET_NAME =
  process.env.GCP_CLOUD_STORAGE_BUCKET_NAME

export const GCP_CLOUD_STORAGE_JSON_CREDENTIALS_NAME =
  process.env.GCP_CLOUD_STORAGE_JSON_CREDENTIALS_NAME

// ############### AUTH PROVIDER ###############
export const GCP_AUTH_PROVIDER_OAUTH_CLIENT_ID =
  process.env.GCP_AUTH_PROVIDER_OAUTH_CLIENT_ID
export const GCP_AUTH_PROVIDER_OAUTH_CLIENT_SECRET =
  process.env.GCP_AUTH_PROVIDER_OAUTH_CLIENT_SECRET

// ######################### AMAZON WEB SERVICES #########################
// ############### S3 Simple Storage Service ###############
export const AWS_S3_BUCKET_REGION = process.env.AWS_S3_BUCKET_REGION
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
