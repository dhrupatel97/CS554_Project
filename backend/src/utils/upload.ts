import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import ImageData from '../schema/imageschema'
import UserData from '../schema/userschema';
import { ObjectId } from 'mongodb';


async function s3Upload(mReq, req, callback) {
  AWS.config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRETKEY,
    region: process.env.AWS_REGION
  });
  const newId = new ObjectId();
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fs.createReadStream(mReq.file.path),
    Key: `useArtsy/${mReq.file.originalname}-${newId}`
  };
  const s3 = new AWS.S3();
  const currentUser = req['currentUser'];
  UserData.findOne({
    email: currentUser.email
  }, function(err, user){
    if(err){
      callback(401, err.message)
    }else{
      s3.upload(params, (err, data) => {
        fs.unlinkSync(mReq.file.path)
        if (err) {
          console.log(err)
          callback(500, err.message)
        } else {
          if (data) { 
            const keywords = req.body.keywords.split(",").map(key => {
              let trimmed = key.trim()
             return trimmed
           })
            const imageUrl = data.Location;
            const image = {
              image_name: req.body.image_name,
              category: req.body.category,
              desc: req.body.desc ? req.body.desc : '',
              url: imageUrl,
              keywords: req.body.keywords ? keywords : [],
              posted_by: user.firstName,
              _id: new ObjectId()
            }
            let imageData = new ImageData(image);
            imageData.save((err: any) => {
              if (err) {
                callback(400, err.message)
              } else {
 
                UserData.update({
                  email: currentUser.email
                },{
                  $push : { "postedImages" : image._id.toString()}     
                },(err: any, user :any)=> {
                  if(err){
                    callback(500,err.message);
                  }else{
                    callback(200,image)
                  }
                });
                // callback(200, image)
              }
            });
          }
        }
      })
    }
  }) 
}

export { s3Upload };