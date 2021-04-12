import { getRepository } from 'typeorm';
import Animal from '../entitites/animal';
import { animals } from '../entitites/animals';
import Report from '../entitites/report';

export async function getAnimal(name: string): Promise<Animal> {
    if (!name) {
        throw new Error('Name type must be provided!');
    }
    const animalsRepository = getRepository(Animal);
    return await animalsRepository.findOne({ commonName: name });
}

export function getAllAnimals(from: string): Promise<Animal[]> {
    return getRepository(Animal).createQueryBuilder('animal').orderBy('animal.commonName', 'ASC')
    .skip(parseInt(from, 10)).take(20).getMany();
}

export async function getRandomAnimal(): Promise<Animal> {
    const animalsRepository = getRepository(Animal);
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    return await animalsRepository.findOne({ commonName: randomAnimal });
}

export async function reportAnimal(commonName: string, animalId: number): Promise<Report> {
    const reportRepository = getRepository(Report);
    const existingReport = await reportRepository.findOne({ animalId });
    if (!existingReport) {
        const newReport = {
            commonName,
            animalId
        };
        return reportRepository.save(newReport);
    } else {
        return
    }
}

// export async function getAllIncorrectAnimals(): Promise<Incorrect[]> {
//     const incorrectNameAnimalsRepository = getRepository(Incorrect);
//     const animalsRepository = getRepository(Animal);
//     const incorrectNameAnimals = await incorrectNameAnimalsRepository.find();
//     const incorrect = incorrectNameAnimals.map(async (incorrect: Incorrect) => {
//         const animal = await animalsRepository.findOne({ commonName: incorrect.commonName });
//         if (animal.scientificName !== incorrect.scientificName) {
//             return animal;
//         }
//     });
//     return Promise.all(incorrect);
// }

// export async function addAnimals(data: Animal[]): Promise<Animal[]> {
//     const animalsRepository = getRepository(Animal);
//     const savedAnimals = await data.map(async (animal: Animal) => {
//         const existingPosition = await animalsRepository.findOne({ commonName: animal.commonName });
//         if (!existingPosition) {
//             const newAnimal = {
//                 commonName: animal.commonName,
//                 scientificName: animal.scientificName,
//                 classis: animal.classis,
//                 status: animal.status,
//                 image: animal.image,
//                 description: animal.description
//             };
//             return animalsRepository.save(newAnimal);
//         }
//     });
//     return Promise.all(savedAnimals);
// }
