import { NextFunction, Request, Response, Router } from 'express';
import { AnimalsApi } from '../index';
import Animal from '../entitites/animal';
import Report from '../entitites/report';

const router = Router();

router.get('/random', (req: Request, res: Response, next: NextFunction) => {
    AnimalsApi.getRandomAnimal().then((result: Animal) => res.status(200).send(result)).catch(next);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    AnimalsApi.getAnimal(req.params.id).then((result: Animal) => res.status(200).send(result)).catch(next);
});

router.post('/report', (req: Request, res: Response, next: NextFunction) => {
    AnimalsApi.reportAnimal(req.body.commonName, req.body.animalId).then((result: Report) => res.status(200).send(result)).catch(next);
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    AnimalsApi.getAllAnimals(req.body.from, req.body.letter).then((result: Array<Animal>) => res.status(200).send(result)).catch(next);
});

// router.post('/add', (req: Request, res: Response, next: NextFunction) => {
//     AnimalsApi.addAnimals(req.body.animals).then((result: Array<Animal>) => res.status(200).send(result)).catch(next);
// });

export default router;

