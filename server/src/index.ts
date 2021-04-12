import { getAllAnimals, getAnimal, getRandomAnimal, reportAnimal } from './providers/animals';
import Animal from './entitites/animal';
import Report from './entitites/report';

interface AnimalsApiInterface {
    getRandomAnimal: () => Promise<Animal>;
    getAllAnimals: (from: string) => Promise<Array<Animal>>;
    getAnimal: (name: string) => Promise<Animal>;
    reportAnimal: (commonName: string, animalId: number) => Promise<Report>;
    // addAnimals: (animals: Array<Animal>) => Promise<Array<Animal>>;
}

export const AnimalsApi: AnimalsApiInterface = {
    getRandomAnimal,
    getAllAnimals,
    getAnimal,
    reportAnimal
    // addAnimals
};
