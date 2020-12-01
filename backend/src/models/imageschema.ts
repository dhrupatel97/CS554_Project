import  {  Document } from "mongoose";
import * as mongoose from "mongoose"
import  { Schema } from "mongoose";
export interface Image extends Document {
    PHOTO_NAME : string,
    DESCRIPTION: string,
    POSTED_BY: string,
    CATEGORY : string,
    NO_OF_LIKES: number,
    NO_OF_DISLIKES: number,
    COMMENTS: Array<Object>
    date : Date
  }

const ImageSchema = new Schema({
    
    PHOTO_NAME: {
        type: String,
        required: true
    },
    DESCRIPTION: {
        type: String,
        required: true
    },
    POSTED_BY: {
        type: String,
        required: true
    },
    CATEGORY: {
        type: String,
        required: true
    },
    NO_OF_LIKES: {
        type: Number,
        default: 0
    },
    NO_OF_DISLIKES: {
        type: Number,
        default: 0
    },
    COMMENTS: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const ImageData = mongoose.model<Image>("Image", ImageSchema);

export default ImageData;