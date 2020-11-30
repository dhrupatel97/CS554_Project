import  {  Document } from "mongoose";
import * as mongoose from "mongoose"
import  { Schema } from "mongoose";
export interface Image extends Document {
    name : string,
    category : string,
    date : Date
  }

const ImageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const ImageData = mongoose.model<Image>("Image", ImageSchema);

export default ImageData;