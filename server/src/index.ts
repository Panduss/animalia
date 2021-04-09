import Animal from './entitites/animal';
import Incorrect from './entitites/incorrect';
import { addAnimals, getAllAnimals, getAllIncorrectAnimals, getAnimal, getRandomAnimal } from './providers/animals';

interface AnimalsApiInterface {
    getRandomAnimal: () => Promise<Animal>;
    getAllAnimals: (from: string) => Promise<Array<Animal>>;
    getAnimal: (name: string) => Promise<Animal>;
    getAllIncorrectAnimals: () => Promise<Array<Incorrect>>;
    addAnimals: (animals: Array<Animal>) => Promise<Array<Animal>>;
}

export const AnimalsApi: AnimalsApiInterface = {
    getRandomAnimal,
    getAllAnimals,
    getAnimal,
    getAllIncorrectAnimals,
    addAnimals
};
