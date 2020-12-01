import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../../.env.test`;
    break;
  case "production":
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: path });

export const AWS_ID = process.env.AWS_ID;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const AWS_SECRETKEY = process.env.AWS_SECRETKEY;