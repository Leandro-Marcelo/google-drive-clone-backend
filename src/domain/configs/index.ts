// another way: import 'dotenv/config'
import * as dotenv from "dotenv"
dotenv.config({
  path: ".env.dev",
})

if (
  process.env.REST_API_PORT === undefined ||
  process.env.REST_API_URL === undefined ||
  process.env.JWT_SECRET === undefined ||
  process.env.DATABASE_URL === undefined ||
  process.env.GCP_CLOUD_STORAGE_BUCKET_NAME === undefined ||
  process.env.AWS_S3_BUCKET_REGION === undefined ||
  process.env.AWS_S3_BUCKET_NAME === undefined
) {
  throw new Error("Missing environment variables")
}

export const REST_API_PORT = process.env.REST_API_PORT
export const REST_API_URL = process.env.REST_API_URL
export const JWT_SECRET = process.env.JWT_SECRET

// export const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME not working
export const SESSION_COOKIE_NAME = "DEVELOPMENT_ECO_SESSION_COOKIE_NAME"
export const DATABASE_URL = process.env.DATABASE_URL

// GCP
export const GCP_CLOUD_STORAGE_BUCKET_NAME =
  process.env.GCP_CLOUD_STORAGE_BUCKET_NAME

// AWS
export const AWS_S3_BUCKET_REGION = process.env.AWS_S3_BUCKET_REGION
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
