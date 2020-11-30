import  {  Document } from "mongoose";
import * as mongoose from "mongoose"
import  { Schema } from "mongoose";
export interface User extends Document {
    firstName : string,
    lastName : string,
    email : string,
    password : string
  }

const UserSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const UserData = mongoose.model<User>("User", UserSchema);

export default UserData;