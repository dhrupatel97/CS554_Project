import * as express from 'express';
import { Images } from './controllers/image';
import { Users } from './controllers/user';
import mongoConnection from "./config/mongoConnection";
import bodyParser = require('body-parser');
<<<<<<< HEAD
const decodeIDToken = require('../authenticateToken');
=======
import { decodeIDToken } from '../authenticateToken';
>>>>>>> 9f93b72fe5c701acd472a5c4ae85fc9b11c5b89c
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
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.static('public'));
		this.app.use(decodeIDToken);
	}
}

export default new App().app;