import * as dotenv from "dotenv";

dotenv.config();
export const AWS_ID = process.env.AWS_ID;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const AWS_SECRETKEY = process.env.AWS_SECRETKEY;