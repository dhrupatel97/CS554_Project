import ImageData from '../models/imageschema'
import { Request, Response } from 'express';

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

          app.route('/api/images').post((req: Request, res: Response) => {      
            let image = new ImageData(req.body);
            image.save((err: any) => {
                if (err) {
                  res.status(400).send(err.message);
                } else {
                  res.json(image);
                }
              });
          });
    }
}