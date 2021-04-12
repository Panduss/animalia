import { Router } from 'express';
import animals from './animals';

const routes = Router();
routes.use('/animals', animals);

export default routes;
