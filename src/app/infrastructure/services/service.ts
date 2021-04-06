import { Injectable } from '@angular/core';
import { ReadService } from '../contracts/services/read';
import { AnimalPrototype, WikiResponsePrototype } from '../../models/animal/prototype';
import { HttpClient } from '@angular/common/http';
import * as animalsDb from '../../models/animal/animalsDb.json';
import { map } from 'rxjs/operators';
import { Animal } from '../../models/animal/model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastProvider } from '../providers/toast';

@Injectable()
export class AnimalService implements ReadService<Animal> {

    public animalPrototype: AnimalPrototype;
    private animals = animalsDb.FULL_LIST;

    public constructor(
        private http: HttpClient,
        private afs: AngularFirestore,
        private toast: ToastProvider
    ) {
        this.animalPrototype = this.getRandomAnimal();
    }

    public retrieve(): Observable<Animal> {
        this.animalPrototype = this.getRandomAnimal();
        const query = `titles=${ this.animalPrototype.commonName.split(' ').join('_') }`;
        return this.getWikiData(query);
    }

    private getWikiData(query: string): Observable<Animal> {
        console.log('query', query);
        return this.http.get<WikiResponsePrototype>(
            `${ environment.wikipedia.baseUrl }${ query }${ environment.wikipedia.getThumbnail }`
        ).pipe(map((response: WikiResponsePrototype) => {
            const page = response.query.pages[0];
            const animal = new Animal(
                this.animalPrototype.commonName,
                this.animalPrototype.scientificName,
                page.extract && (page.extract),
                page.thumbnail && page.thumbnail.source && (page.thumbnail.source)
            );
            this.updateDatabase(animal);
            return animal;
        }));
    }

    private getRandomAnimal(): AnimalPrototype {
        return this.animals[Math.floor(Math.random() * this.animals.length)];
    }

    private updateDatabase(animal: Animal): void {
        if (animal.getImage()) {
            this.addAnimalDataAsCorrect(animal);
        } else {
            this.addAnimalDataAsIncorrect(animal);
        }
    }

    private addAnimalDataAsCorrect(animal: Animal): void {
        const id = animal.getCommonName().split(' ').join('_');
        const animalRef = this.afs.collection('animals').doc(id);
        animalRef.get().toPromise().then(
            (docSnapshot: any) => {
                if (!docSnapshot.exists) {
                    this.afs.collection('animals').doc(id).set(Object.assign({}, animal)).then(
                        () => {
                            this.toast.presentToastWithOptions(
                                `${ animal.getCommonName() } added (as CORRECT data) to database`,
                                3000,
                                'success-toast',
                                'top'
                            );
                        }
                    );
                }
            }
        );
    }

    private addAnimalDataAsIncorrect(animal: Animal): void {
        const id = animal.getCommonName().split(' ').join('_');
        const animalRef = this.afs.collection('incorrectAnimals').doc(id);
        const newIncorrectAnimal = {
            commonName: this.animalPrototype.commonName,
            scientificName: this.animalPrototype.scientificName,
            description: null,
            image: null
        };

        animalRef.get().toPromise().then(
            (docSnapshot: any) => {
                if (!docSnapshot.exists) {
                    this.afs.collection('incorrectAnimals').doc(id).set(Object.assign({}, newIncorrectAnimal)).then(
                        () => {
                            this.toast.presentToastWithOptions(
                                `${ animal.getCommonName() } added (as INCORRECT data) to database`,
                                3000,
                                'success-toast',
                                'top'
                            );
                        }
                    );
                }
            }
        );
    }

    public reportData(animal: Animal): void {
        const id = animal.getCommonName().split(' ').join('_');
        const animalRef = this.afs.collection('weirdData').doc(id);

        animalRef.get().toPromise().then(
            (docSnapshot: any) => {

                if (docSnapshot.exists) {
                    this.toast.presentToastWithOptions(
                        `${ animal.getCommonName() } is already added. Thanks for reporting it tho!`,
                        3000,
                        'warning-toast'
                    );

                } else {
                    this.afs.collection('weirdData').doc(id).set(Object.assign({}, animal)).then(
                        () => {
                            this.toast.presentToastWithOptions(
                                `${ animal.getCommonName() } is added. Thanks for reporting!`,
                                3000,
                                'success-toast'
                            );
                        }
                    );
                }
            }
        );
    }
}
