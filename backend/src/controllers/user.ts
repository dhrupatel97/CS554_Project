import UserData from '../schema/userschema'
import { Request, Response } from 'express';

export class Users {
  public routes(app): void {
    app.route('/api/users').post((req: Request, res: Response) => {
      let user = new UserData(req.body);
      user.email = user.email.toLowerCase();
      UserData.findOne({
        email: user.email
      }, function (err, userRes) {
        if (userRes) {
          res.json(userRes)
        }else{
          user.save((err: any) => {
            if (err) {
              res.status(400).send(err.message);
            } else {
              res.json(user);
            }
          });
        }
      })
    });

    app.route('/api/users').get((req: Request, res: Response) => {
      const currentUser = req['currentUser'];
      currentUser.email = currentUser.email.toLowerCase();
      UserData.findOne({
        email: currentUser.email
      }, function (err, user) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(user)
        }
      });
    });
  }
}