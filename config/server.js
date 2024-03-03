import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import authRoutes from '../src/auth/auth.routes.js'


class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/'
        this.authPath = '/'

        this.middlewares();
        this.connectDB();
        this.routes();
    }

        async connectDB() {
        await dbConnection();
        }

    middlewares(){
    this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use(this.adminPath, adminRoutes);
        this.app.use(this.authPath, authRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runnig on port ', this.port);
        });
    }

}

export default Server;