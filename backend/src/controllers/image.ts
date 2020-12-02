import ImageData from '../models/imageschema'

import { ImadeDataAccess } from '../data/image';
import { UserDataAccess } from '../data/user';
import { Request, Response } from 'express';
import * as multer from 'multer';
import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import { MulterRequest } from '../models/multerreq'

export class Images {
    public routes(app): void {

        const imageDataAccess = new  ImadeDataAccess();
        const userDataAccess = new UserDataAccess();

        app.route('/api/images').get((req: Request, res: Response) => {
            
            imageDataAccess.getAllImages((err: any, images: any) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(images);
                }
            });
        });

        app.route('/api/images/:id/like').patch((req: Request, res: Response) => {
                    const id = req.params.id;
                    const userId = req.body.userId;
                    // TODO
                    // Who is the user

                    userDataAccess.hasUserLiked( userId, id, ( data: any ) => {
                        imageDataAccess.updateLike( id, data, (err: any, images: any)=>{
                            if(err){
                                res.status(500).send(err);
                            }else{
                                console.log( "patch hasUserliked", data)
                                userDataAccess.updateLikedImage( userId, id, data );

                                ImageData.findById(id,(err: any, images: any) => {
                                    if (err) {
                                        res.status(500).send(err);
                                    } else {
                                        res.json(images);
                                    }
                                })
                            }
                        });
                    } )


                    
        })


        app.route('/api/images').post(
            multer({ dest: 'temp/', limits: { fileSize: 8 * 1024 * 1024 } }).single('image'),
            (req: Request, res: Response) => {
                
                try {
                    AWS.config.update({
                        accessKeyId: process.env.AWS_ID,
                        secretAccessKey: process.env.AWS_SECRETKEY,
                        region: process.env.AWS_REGION
                    });
                    const s3 = new AWS.S3();
                    const mReq = req as MulterRequest

                    if (mReq && mReq.file) {

                        let params = {
                            ACL: 'public-read',
                            Bucket: process.env.AWS_BUCKET_NAME,
                            Body: fs.createReadStream(mReq.file.path),
                            Key: `useArtsy/${mReq.file.originalname}`
                        };
                        console.log("BUCEKT NAME ---------------------", process.env.AWS_BUCKET_NAME)
                        s3.upload(params, (err, data) => {
                            fs.unlinkSync(mReq.file.path)
                            if (err) {
                                console.log(err)
                                res.status(500).send(err.message);
                            } else {
                                if (data) {
                                    const imageUrl = data.Location;
                                    const image = {
                                        name: req.body.name ? req.body.name : '' ,
                                        category: req.body.category,
                                        desc: req.body.desc ? req.body.desc : '' ,
                                        url: imageUrl,
                                    }
                                    let imageData = new ImageData(image);
                                    imageData.save((err: any) => {
                                        if (err) {
                                            res.status(400).send(err.message);
                                        } else {
                                            res.json(image);
                                        }
                                    });
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