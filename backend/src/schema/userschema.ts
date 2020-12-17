import  {  Document } from "mongoose";
import * as mongoose from "mongoose"
import  { Schema } from "mongoose";
export interface User extends Document {
    firstName : string,
    email : string,
    likedImages: [string],
    postedImages: [string]
  }

const UserSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },  
    email: {
        type: String,
        required: true
    },
    likedImages: {
        type: [String],
        default : [],
        required: false
    },
    postedImages: {
        type: [String],
        default : [],
        required: false
    }

})

const UserData = mongoose.model<User>("User", UserSchema);

export default UserData;