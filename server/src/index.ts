import Animal from './entitites/animal';
import { addAnimals, getAllAnimals, getAnimal, getRandomAnimal } from './providers/animals';

interface AnimalsApiInterface {
    getRandomAnimal: () => Promise<Animal>;
    getAllAnimals: (from: string) => Promise<Array<Animal>>;
    getAnimal: (name: string) => Promise<Animal>;
    addAnimals: (animals: Array<Animal>) => Promise<Array<Animal>>;
}

export const AnimalsApi: AnimalsApiInterface = {
    getRandomAnimal,
    getAllAnimals,
    getAnimal,
    addAnimals
};
