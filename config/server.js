import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import adminRoutes from '../src/Admin/admin.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import companyRoutes from '../src/Company/company.routes.js';


class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/companyR/v1/admins';
        this.authPath = '/companyR/v1/auth';
        this.companiesPath = '/companyR/v1/companyE'

        this.middlewares();
        this.connectDB();
        this.routes();
    }

        async connectDB() {
        await dbConnection();
        }

    middlewares(){
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan('dev'))
    }

    routes() {
        this.app.use(this.adminPath, adminRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.companiesPath, companyRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runnig on port ', this.port);
        });
    }

}

export default Server;