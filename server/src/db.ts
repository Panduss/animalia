import { createConnection } from 'typeorm';
import Animal from './entitites/animal';
import Report from './entitites/report';

export default () =>
    createConnection(
        {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [
                Animal,
                Report
            ],
            synchronize: true,
            logging: true,
            ...(process.env.NODE_ENV === 'production' && {ssl: { rejectUnauthorized: false }})
        }).then((_) => console.log('Connected to Postgres with TypeORM'));
