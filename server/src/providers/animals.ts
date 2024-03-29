import { getRepository } from 'typeorm';
import Animal from '../entitites/animal';
import { animals } from '../entitites/animals';
import Report from '../entitites/report';
import { AnimalQuery } from '../entitites/animalQuery';

export async function getAnimal(name: string): Promise<Animal> {
    if (!name) {
        throw new Error('Name type must be provided!');
    }
    const animalsRepository = getRepository(Animal);
    return await animalsRepository.findOne({ commonName: name });
}

export function getAllAnimals(query: AnimalQuery): Promise<Animal[]> {

    let request = getRepository(Animal)
        .createQueryBuilder('animal')
        .skip(query.from)
        .take(20);

    if (query.name) {
        return request
            .where('animal.commonName iLike :name', { name: '%' + query.name + '%' })
            .orWhere('animal.scientificName iLike :name', { name: '%' + query.name + '%' })
            .orderBy('animal.commonName', 'ASC')
            .getMany();
    } else if (query.letter !== 'All' && query.status === 'All') {
        request = request.where('animal.commonName iLike :name', { name: query.letter + '%' });
    } else if (query.status !== 'All' && query.letter === 'All') {
        request = request.where('animal.status iLike :status', { status: query.status } );
    } else if (query.status !== 'All' && query.letter !== 'All') {
        request = request
            .where('animal.commonName like :name', { name: query.letter + '%' })
            .andWhere('animal.status like :status', { status: query.status } );
    }

    return request.orderBy('animal.commonName', 'ASC').getMany();
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
        return existingReport;
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
//                 status: animal.status,
//                 image: animal.image,
//                 description: animal.description
//             };
//             return animalsRepository.save(newAnimal);
//         }
//     });
//     return Promise.all(savedAnimals);
// }
