import  {  Document } from "mongoose";

export interface Image extends Document {
    image_name: string,
    desc: string,
    posted_by: string,
    url: string,
    category : string,
    no_of_likes: number,
    keywords: string[],
    comments:Comment[],
    date : Date
  }
export interface Comment extends Document {
    name: string,
    comment: string
}

