import { getAllAnimals, getAnimal, getRandomAnimal, reportAnimal } from './providers/animals';
import Animal from './entitites/animal';
import Report from './entitites/report';
import { AnimalQuery } from './entitites/animalQuery';

interface AnimalsApiInterface {
    getRandomAnimal: () => Promise<Animal>;
    getAllAnimals: (query: AnimalQuery) => Promise<Array<Animal>>;
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
