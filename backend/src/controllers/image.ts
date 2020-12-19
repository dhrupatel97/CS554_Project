import ImageData from '../schema/imageschema'
import { ImadeDataAccess } from '../data/image';
import { UserDataAccess } from '../data/user';
import { Request, Response } from 'express';
import * as multer from 'multer';
import { MulterRequest } from '../models/multerreq'
import { s3Upload } from '../utils/upload'
import { imageResize } from '../utils/imageMagick'
import UserData from '../schema/userschema';

export class Images {
  public routes(app): void {

    const imageDataAccess = new ImadeDataAccess();
    const userDataAccess = new UserDataAccess();

    app.route('/api/images/:id/download').get((req: Request, res: Response) => {
        ImageData.findById(req.params.id, (err: any, images: any) => {
          if (err) {
            res.status(500).send(err);
          } else {
            if (images === null) {
              res.status(404).send("Image for given id not found")
            } else {
              imageResize(images, req, (resizedFile, rootObj) => {
                res.sendFile(resizedFile, rootObj)
              })
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

    app.route('/api/imagesByUser').get((req: Request, res: Response) => {
      const currentUser = req['currentUser'];
      currentUser.email = currentUser.email.toLowerCase();
      UserData.findOne({
        email: currentUser.email
      }, function (err, user) {
        if (err) {
          res.status(500).send(err);
          
        }else if(user === null){
          res.status(404).send("user not found")     
        }else{
          const imageIds = user.postedImages;
          imageDataAccess.getImagesByImageIds(imageIds, (err: any, images: any) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.json(images);
            }
          });
        }    
    });
    });

    app.route('/api/images/:id').get((req: Request, res: Response) => {
      ImageData.findById(req.params.id, (err: any, images: any) => {
        if (err) {
          res.status(500).send(err);
        } else {
          if (images === null) {
            res.status(404).send("Image for given id not found")
          }else{
            res.json(images);
          }       
        }
      });
    });

    app.route('/api/imagesByFilter').get((req: Request, res: Response) => {
      let filter = {};
      if (req.query.keywords) {
        filter["keywords"] = { $in: req.query.keywords }
      }
      if (req.query.category) {
        filter["category"] = { $eq: req.query.category }
      }
      imageDataAccess.getAllImagesByFilter(filter, (err: any, images: any) => {
        if (err) {
          console.log( err );
          res.status(500).send(err);
        } else {
          if (images === null) {
            res.status(404).send("Image for given id not found")
          }else{
            res.json(images);
          } 
        }
      });
    });


    app.route('/api/images/:id/like').patch((req: Request, res: Response) => {
      const id = req.params.id;
      const currentUser = req['currentUser'];
      currentUser.email = currentUser.email.toLowerCase();
      console.log("Current User : --------------> " , currentUser )
      UserData.findOne({
        email: currentUser.email
      }, function (err, user) {
        if (err) {
          res.status(500).send(err);
        }else if(user === null){
          res.status(404).send("user not found")     
        }else{
          userDataAccess.hasUserLiked(user._id, id, (data: any) => {
            imageDataAccess.updateLike(id, data, (err: any, images: any) => {
              if (err) {
                res.status(500).send(err);
              } else {
                userDataAccess.updateLikedImage(user._id, id, data);
                ImageData.findById(id, (err: any, images: any) => {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    if (images === null) {
                      res.status(404).send("Image for given id not found")
                    }else{
                      res.json(images);
                    }
                  }
                })
              }
            });
          })
        }  
      })
    })

    app.route('/api/images').post(
      multer({ dest: 'temp/', limits: { fileSize: 8 * 1024 * 1024 } }).single('image'),
      (req: Request, res: Response) => {
        try {
          const mReq = req as MulterRequest
          if (mReq && mReq.file) {
            s3Upload(mReq, req, (code, message) => {
              if (code === 200) {
                res.json(message);
              } else {
                res.status(code).send(message);
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
        const currentUser = req['currentUser'];
        currentUser.email = currentUser.email.toLowerCase();
        UserData.findOne({
          email: currentUser.email
        }, function (err, user) {
          if (err) {
            res.status(500).send(err);
          }else if(user === null){
            res.status(404).send("user not found");
          }else{
            ImageData.findById(req.params.id, (err: any, images: any) => {
              if (err) {
                res.status(500).send(err);
              } else {
                if (images === null) {
                  res.status(404).send("Image for given id not found")
                } else {
                  let commentBody = req.body;
                  commentBody.name = user.firstName;
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