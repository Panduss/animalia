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
            ssl: true
        }).then((_) => console.log('Connected to Postgres with TypeORM'));
