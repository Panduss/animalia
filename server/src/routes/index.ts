import { Router } from 'express';
import animals from './animals';
import incorrect from './incorrect';

const routes = Router();
routes.use('/animals', animals);
routes.use('/incorrect', incorrect);

export default routes;
