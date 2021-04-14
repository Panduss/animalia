import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { AnimalPrototype } from '../../../models/animal/prototype';
import { IonContent, ModalController } from '@ionic/angular';
import { AnimalService } from '../../../infrastructure/services/animals.service';
import { AnimalCardComponent } from '../../components/animalCard/animalCard.component';
import { alphabet } from '../../../../assets/alphabet';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListPage implements OnInit {

    @ViewChild(IonContent, { static: true }) content!: IonContent;
    public animals: Array<AnimalPrototype> = [];
    public showScrollToTopButton = false;
    public mappedAnimals: Array<any> = [];
    public from = 0;
    public letter = 'A';
    public loading = false;
    public endOfResults = false;
    public alphabet = alphabet;
    private eventEmitter = new EventEmitter();

    public constructor(
        private animalService: AnimalService,
        private modalController: ModalController
    ) {
        this.eventEmitter.subscribe((event: boolean) => {
            if (event) {
                this.modalController.dismiss();
            }
        });
    }

    public ngOnInit() {
        this.loading = true;
        this.listAnimals();
    }

    public logScrolling(event: CustomEvent): void {
        this.showScrollToTopButton = event.detail.currentY > 0;
    }

    public scrollToTop() {
        this.content.scrollToTop(300);
    }

    public listAnimals(): void {
        this.animalService.retrieveAll(this.from, this.letter).subscribe((animals: Array<AnimalPrototype>) => {
            const length = animals.length;
            console.log(length);
            if (length < 20) {
                this.endOfResults = true;
            }
            for (let i = 0; i < length; i++) {
                this.animals.push(animals[i]); // this will work without blinks or jumps
            }
            this.loading = false;
        });
    }

    public loadMore() {
        this.loading = true;
        this.from = this.animals.length;
        this.listAnimals();
    }

    public async openModal(animal: AnimalPrototype): Promise<void> {
        const modal = await this.modalController.create({
            component: AnimalCardComponent,
            componentProps: {data: animal, button: 'Back', event: this.eventEmitter}
        });

        await modal.present();
    }

    public setLetter(letter: string): void {
        this.animals = [];
        this.loading = true;
        this.letter = letter;
        this.from = 0;
        this.listAnimals();
    }
}
