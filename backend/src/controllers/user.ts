import UserData from '../models/userschema'
import { Request, Response } from 'express';

export class Users {
    public routes(app): void {  
          app.route('/api/users').post((req: Request, res: Response) => {  
            let user = new UserData(req.body);
            user.save((err: any) => {
                if (err) {
                  res.status(400).send(err.message);
                } else {
                  res.json(user);
                }
              });
          });
    }
}