import  {  Document } from "mongoose";
import * as mongoose from "mongoose"
import  { Schema } from "mongoose";
export interface Image extends Document {
    image_name: string,
    desc: string,
    posted_by: string,
    url: string,
    category : string,
    no_of_likes: number,
    no_of_dislikes: number,
    comments: Array<Object>
    date : Date
  }

const ImageSchema = new Schema({
    image_name: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    },
    posted_by: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    no_of_likes: {
        type: Number,
        default: 0
    },
    no_of_dislikes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const ImageData = mongoose.model<Image>("Image", ImageSchema);

export default ImageData;