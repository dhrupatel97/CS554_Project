import ImageData from '../models/imageschema'
import { Request, Response } from 'express';
import * as multer from 'multer';
import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import { MulterRequest } from '../models/multerreq'

export class Images {
    public routes(app): void {
        app.route('/api/images').get((req: Request, res: Response) => {
            ImageData.find((err: any, images: any) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(images);
                }
            })
        });

       

        app.route('/api/images').post(
            multer({dest: 'temp/', limits: { fileSize: 8 * 1024 * 1024 } }).single('image'),
            (req: Request, res: Response) => {
                
                try {
                    AWS.config.update({   
                        accessKeyId: process.env.AWS_ID,
                        secretAccessKey: process.env.AWS_SECRETKEY ,
                        region:'us-east-1'
                      });
                    const s3 = new AWS.S3();                  
                    const mReq  = req as MulterRequest
                   
                    if (mReq && mReq.file) {
                       
                        let params = {
                            ACL: 'public-read',
                            Bucket: process.env.AWS_BUCKET_NAME,
                            Body: fs.createReadStream(mReq.file.path),
                            Key: `useArtsy/${mReq.file.originalname}`
                        };
                        console.log("BUCEKT NAME ---------------------",process.env.AWS_BUCKET_NAME)
                        s3.upload(params, (err, data) => {
                            
                            if (err) {
                                console.log(err)
                                res.status(500).send(err.message);
                            } else {
                                if (data) {
                                    const imageUrl = data.Location;
                                    console.log("Success", imageUrl)
                                    res.status(200).send(imageUrl)
                                }
                            }
                        })
                    } else {
                        res.status(400).send("Bad Request");
                    }
                } catch (error) {
                    console.log(error);
                    return res.status(500).json(`Failed to upload image file: ${error}`);
                }
            });
 
    }
}