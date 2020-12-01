import * as express from 'express';
import { Images } from './controllers/image';
import { Users } from './controllers/user';
import mongoConnection from "./config/mongoConnection";
import bodyParser = require('body-parser');
// import * as dotenv from 'dotenv';

class App {
	public app: express.Application;
    public imageRoutes: Images = new Images();
    public userRoutes: Images = new Users();

	constructor() {
		this.app = express();
        this.config();
        this.imageRoutes.routes(this.app);
        this.userRoutes.routes(this.app);
        // dotenv.config();
	}
	private config(): void {
        this.app.use(bodyParser.json())
        const db: string = "mongodb://localhost:27017/Artsy"
        mongoConnection(db);
		// this.app.use(express.json({
        //     "limit": "50mb"
        // }));
        // this.app.use(express.urlencoded({
        //     "limit":"50mb", 
        //     "extended": true }));
        // this.app.use(bodyParser.json({limit:'50mb'})); 
        // this.app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));       
	}
}

export default new App().app;