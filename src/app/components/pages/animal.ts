import { Component, NgZone, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from '../../models/animal/model';
import { AnimalService } from '../../infrastructure/services/service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastProvider } from '../../infrastructure/providers/toast';

@Component({
    selector: 'app-animal',
    templateUrl: '../../templates/pages/animal.html'
})

export class AnimalPage implements OnInit {

    public animal: Animal = new Animal('', '');
    private dataSubscription: Subscription = new Subscription();

    public constructor(
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private animalService: AnimalService,
        private afs: AngularFirestore,
        private toast: ToastProvider
    ) {
    }

    public ngOnInit() {
       this.getAnimal();
    }

    public saveAnimalToDatabase(): void {
        const animalToBeSaved = this.animal;
        if (animalToBeSaved.getImage()) {
            // this.addAnimalDataAsCorrect(animalToBeSaved);
        } else {
            // this.addAnimalDataAsIncorrect(animalToBeSaved);
        }
    }

    private addAnimalDataAsCorrect(animal: Animal): void {

        const id = animal.getCommonName().split(' ').join('_');
        const animalRef = this.afs.collection('animals').doc(id);

        animalRef.get().toPromise().then(
            (docSnapshot: any) => {

                if (docSnapshot.exists) {
                    this.toast.presentToastWithOptions(
                        `${animal.getCommonName()} already exist (as CORRECT data) in database`,
                        3000,
                        'warning-toast',
                        'top'
                    );

                } else {
                    this.afs.collection('animals').doc(id).set(Object.assign({}, animal)).then(
                        () => {
                            this.toast.presentToastWithOptions(
                                `${animal.getCommonName()} added (as CORRECT data) to database`,
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
            commonName: this.animal.getCommonName(),
            scientificName: this.animal.getScientificName(),
            description: null,
            image: null
        };

        animalRef.get().toPromise().then(
            (docSnapshot: any) => {

                if (docSnapshot.exists) {
                    this.toast.presentToastWithOptions(
                        `${animal.getCommonName()} already exist (as INCORRECT data) in database`,
                        3000,
                        'warning-toast',
                        'top'
                    );

                } else {
                    this.afs.collection('incorrectAnimals').doc(id).set(Object.assign({}, newIncorrectAnimal)).then(
                        () => {
                            this.toast.presentToastWithOptions(
                                `${animal.getCommonName()} added (as INCORRECT data) to database`,
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
                        `${animal.getCommonName()} is already added. Thanks for reporting it tho!`,
                        3000,
                        'warning-toast'
                    );

                } else {
                    this.afs.collection('weirdData').doc(id).set(Object.assign({}, animal)).then(
                        () => {
                            this.toast.presentToastWithOptions(
                                `${animal.getCommonName()} is added. Thanks for reporting!`,
                                3000,
                                'success-toast'
                            );
                        }
                    );
                }
            }
        );
    }

    public getAnimal(): void {
        this.animalService.retrieve().subscribe((animal: Animal) => {
            this.animal = animal;
            console.log(this.animal);
        });
    }
}
