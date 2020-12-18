import * as express from 'express';
import { Images } from './controllers/image';
import { Users } from './controllers/user';
import mongoConnection from "./config/mongoConnection";
import bodyParser = require('body-parser');
import { decodeIDToken } from './config/authenticateToken';
import * as cors from  'cors'
const helmet = require('helmet');
const xss = require('xss-clean')

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
		this.app.use(cors());
        this.app.use(bodyParser.json())
        const db: string = "mongodb://localhost:27017/Artsy"
		mongoConnection(db);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.static('public'));
		this.app.use(decodeIDToken);
		//Helmet helps to secure express apps by setting various http headers
		this.app.use(helmet())
		//xss-clean sanitizes user inpit coming from post body, get queries and url params
		this.app.use(xss())
	}
}

export default new App().app;