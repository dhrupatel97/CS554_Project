import ImageData from '../schema/imageschema'
import { ImadeDataAccess } from '../data/image';
import { UserDataAccess } from '../data/user';
import { Request, Response } from 'express';
import * as multer from 'multer';
import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import { MulterRequest } from '../models/multerreq'
import { threadId } from 'worker_threads';
let request = require('request');
let im = require('imagemagick');
const path = require('path');


export class Images {
  public routes(app): void {

    const imageDataAccess = new ImadeDataAccess();
    const userDataAccess = new UserDataAccess();


    let download = function (uri, filename, callback) {
      request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };


    app.route('/api/images/:id/download').get((req: Request, res: Response) => {
      imageDataAccess.deletePublicFiles();
      ImageData.findById(req.params.id, (err: any, images: any) => {
        
        if (err) {
          res.status(500).send(err);
        } else {
          if (images === null) {
            res.status(404).send("Image for given id not found")
          } else {
            let url = images.url;
            let name = images.image_name;
            //small or large or extra large or default
            let wandh = req.query.size;
            let saveFinal = 'public/' + name + '-default.jpg'
            let downloadName = 'public/' + name + '.jpg'
            download(url, downloadName, function () {
              let width = 0
              let height = 0
              let dimension = ''
              im.identify(downloadName, function (err, features) {

                if (err) throw err;
                  width = features.width;
                  height = features.height;
                  dimension = width.toString().concat(('x'.concat(height.toString())))
                if (wandh === 'default' || wandh == '') {
                  saveFinal = 'public/' + name + '-default.jpg'
                  width = features.width;
                  height = features.height;
                  dimension = width.toString().concat(('x'.concat(height.toString())))
                } else if (wandh === 'small') {

                  saveFinal = 'public/' + name + '-small.jpg'
                  width = width - (width/2);
                  height = height - (height/2)
                  dimension = width.toString().concat(('x'.concat(height.toString())))

                } else if (wandh === 'large') {
                  saveFinal = 'public/' + name + '-large.jpg'
                  
                  width = width * 2;
                  console.log("width large", width)
                  height = height * 2
                  dimension = width.toString().concat(('x'.concat(height.toString())))
                } 
                // else if (wandh === 'extra_large') {
                //   saveFinal = 'public/' + name + '-extra_large.jpg'
                //   width = width * 3;
                //   height = height * 3
                //   dimension = width.toString().concat(('x'.concat(height.toString())))
                // }              
                 im.convert([downloadName, '-resize', dimension, saveFinal],
                  function (err, stdout) {
                    if (err) throw err;
                    res.sendFile(saveFinal, { root: '.' })     
                  })
              });           
            });
          }
        }
      });
    });

    app.route('/api/images').get((req: Request, res: Response) => {
      imageDataAccess.getAllImages((err: any, images: any) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(images);
        }
      });
    });

    app.route('/api/images/filter').get((req: Request, res: Response) => {
      let filter = {};
      if (req.query.keywords) {
        filter["keywords"] = { $in: req.query.keywords }
      }
      if (req.query.category) {
        filter["category"] = { $eq: req.query.category }
      }
      imageDataAccess.getAllImagesByFilter(filter, (err: any, images: any) => {
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

      userDataAccess.hasUserLiked(userId, id, (data: any) => {
        imageDataAccess.updateLike(id, data, (err: any, images: any) => {
          if (err) {
            res.status(500).send(err);
          } else {
            console.log("patch hasUserliked", data)
            userDataAccess.updateLikedImage(userId, id, data);

            ImageData.findById(id, (err: any, images: any) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.json(images);
              }
            })
          }
        });
      })
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
            s3.upload(params, (err, data) => {
              fs.unlinkSync(mReq.file.path)
              if (err) {
                console.log(err)
                res.status(500).send(err.message);
              } else {
                if (data) {
                  const imageUrl = data.Location;
                  console.log(req.body.keywords)
                  const image = {
                    image_name: req.body.image_name,
                    category: req.body.category,
                    desc: req.body.desc ? req.body.desc : '',
                    url: imageUrl,
                    keywords: req.body.keywords
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

    app.route("/api/images/:id/comments").post(async (req: Request, res: Response) => {
      try {
        ImageData.findById(req.params.id, (err: any, images: any) => {
          if (err) {
            res.status(500).send(err);
          } else {
            if (images === null) {
              res.status(404).send("Image for given id not found")
            } else {
              let commentBody = req.body;
              images.comments.push(commentBody)
              images.save((err: any) => {
                if (err) {
                  res.status(400).send(err.message);
                } else {
                  res.json(images);
                }
              });
            }
          }
        });
      } catch (err) {
        res.status(500).send(err);
      }
    })

    app.route("/api/images/:imageId/:commentId").delete(async (req: Request, res: Response) => {
      try {
        ImageData.findById(req.params.imageId, (err: any, images: any) => {
          if (err) {
            res.status(500).send(err);
          } else {
            if (images === null) {
              res.status(404).send("Image for given id not found")
            } else {

              let comments = images.comments.filter(comment => {
                if (comment && comment._id) {
                  return comment._id.toString() !== req.params.commentId
                } else
                  return true;
              });
              if (images.comments.length == comments.length) {
                res.status(404).send("comment id not found")
                return
              }
              images.comments = comments;
              images.save((err: any) => {
                if (err) {
                  res.status(400).send(err.message);
                } else {

                  res.json(images);
                }
              });
            }

          }
        });
      } catch (err) {
        res.status(500).send(err);
      }
    })

  }
}