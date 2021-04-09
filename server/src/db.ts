import { createConnection } from 'typeorm';
import Animal from './entitites/animal';

export default () =>
    createConnection(
        {
            type: 'postgres',
            url: 'postgres://postgres:secret@localhost:5432/animalia',
            entities: [Animal],
            synchronize: true,
            logging: true
        }).then((_) => console.log('Connected to Postgres with TypeORM'));
