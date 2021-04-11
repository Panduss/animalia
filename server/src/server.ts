import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import setupDb from './db';
import routes from './routes';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT;

const whitelist = [
    'http://localhost:4200',
    'https://animalia.netlify.app'
];

const corsOptions = {
    origin(origin: any, callback: any) {
        if (!origin || whitelist.filter((url) => origin.includes(url)).length) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(morgan(morgan.compile('[:date[web]] :method :url :status (millis :response-time) :remote-addr :referrer')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/', routes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send(
        {
            error: {
                status: error.status || 500,
                message: error.message || 'Internal Server Error'
            }
        });
});

setupDb().then(() => app.listen(PORT, () => console.log(`Listening on port ${ PORT }`))).catch((err) => console.error(err));
