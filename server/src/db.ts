import { createConnection } from 'typeorm';
import Animal from './entitites/animal';

export default () =>
    createConnection(
        {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [Animal],
            synchronize: true,
            logging: true,
            ...(process.env.NODE_ENV === 'production' && {ssl: { rejectUnauthorized: false }})
        }).then((_) => console.log('Connected to Postgres with TypeORM'));
