import * as mongoose from "mongoose"
import  { Schema } from "mongoose";
import {Image} from '../models/imagesModel'

const CommentSchema: Schema = new Schema({
    name: { type: String, required: true,
      set: (v : string) =>{
        if(typeof v !== 'string'){
          throw new Error("Name in comment should be of type string")
        }
        return v;
      } 
    },
    comment:{ type: String, required: true,
      set: (v: string) =>{
        if(typeof v !== 'string'){
          throw new Error("Comment should be of type string")
        }
        return v;
      }  
    }
  })

const ImageSchema = new Schema({
    image_name: {
        type: String,
        required: true,
        set: (v: string) =>{
            if(typeof v !== 'string'){
              throw new Error("Image name should be of type string")
            }
            return v;
          } 
    },
    desc: {
        type: String,
        required: false,
        set: (v : string) =>{
            if(typeof v !== 'string'){
              throw new Error("Description should be of type string")
            }
            return v;
          } 
    },
    posted_by: {
        type: String,
        required: false,
        set: (v : string) =>{
            if(typeof v !== 'string'){
              throw new Error("Posted by should be of type string")
            }
            return v;
          } 
    },
    url: {
        type: String,
        required: true,
        set: (v : string) =>{
            if(typeof v !== 'string'){
              throw new Error("URL should be of type string")
            }
            return v;
          } 
    },
    category: {
        type: String,
        required: true,
        set: (v : string) =>{
            if(typeof v !== 'string'){
              throw new Error("Category should be of type string")
            }
            return v;
          } 
    },
    no_of_likes: {
        type: Number,
        default: 0,
        set: (v : number) =>{
            if(typeof v !== 'number'){
              throw new Error("No of likes passed should be of type string")
            }
            return v;
          } 
    },
    keywords :{
      type: [String], 
      required: false,
      set: (v: any) =>{
        if(!Array.isArray(v)){
          throw new Error("keywords should be an array")
        }
        return v;
      } 
     
    } ,
    comments : {type: [CommentSchema], required: false},
    date: {
        type: Date,
        default: Date.now
    }
})
const ImageData = mongoose.model<Image>("Image", ImageSchema);

export default ImageData;