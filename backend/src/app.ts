import * as express from 'express';
import { Images } from './controllers/image';
import { Users } from './controllers/user';
import mongoConnection from "./config/mongoConnection";

class App {
	public app: express.Application;
    public imageRoutes: Images = new Images();
    public userRoutes: Images = new Users();

	constructor() {
		this.app = express();
		this.config();
        this.imageRoutes.routes(this.app);
        this.userRoutes.routes(this.app);
	}
	private config(): void {
        const db: string = "mongodb://localhost:27017/Artsy"
		mongoConnection(db);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
	}
}

export default new App().app;