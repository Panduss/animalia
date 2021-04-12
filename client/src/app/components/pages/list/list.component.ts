import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { AnimalPrototype } from '../../../models/animal/prototype';
import { IonContent, ModalController } from '@ionic/angular';
import { AnimalService } from '../../../infrastructure/services/animals.service';
import { AnimalCardComponent } from '../../components/animalCard/animalCard.component';

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
    public loading = false;
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
        this.listAnimals(this.from);
    }

    public logScrolling(event: CustomEvent): void {
        this.showScrollToTopButton = event.detail.currentY > 0;
    }

    public scrollToTop() {
        this.content.scrollToTop(300);
    }

    public listAnimals(from: number): void {
        this.animalService.retrieveAll(from).subscribe((animals: Array<AnimalPrototype>) => {
            this.loading = false;
            const length = animals.length;
            for (let i = 0; i < length; i++) {
                this.animals.push(animals[i]); // this will work without blinks or jumps
            }
        });
    }

    public loadMore() {
        this.loading = true;
        this.listAnimals(this.animals.length);
    }

    public async openModal(animal: AnimalPrototype): Promise<void> {
        const modal = await this.modalController.create({
            component: AnimalCardComponent,
            componentProps: {data: animal, button: 'Back', event: this.eventEmitter}
        });

        await modal.present();
    }
}
