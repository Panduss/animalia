import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Animal } from '../../../models/animal';
import { IonContent, ModalController } from '@ionic/angular';
import { AnimalService } from '../../../infrastructure/services/animals.service';
import { AnimalCardComponent } from '../../components/animalCard/animalCard.component';
import { alphabet } from '../../../../assets/alphabet';
import { statuses } from '../../../../assets/statuses';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimalQuery } from '../../../models/animalQuery';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListPage implements OnInit {

    @ViewChild(IonContent, { static: true }) content!: IonContent;
    public animals: Array<Animal> = [];
    public showScrollToTopButton = false;
    public mappedAnimals: Array<any> = [];
    public form: FormGroup;
    public animalQuery = new AnimalQuery();
    public loading = false;
    public endOfResults = false;
    public alphabet = alphabet;
    public statuses = statuses;
    private eventEmitter = new EventEmitter();

    public constructor(
        private animalService: AnimalService,
        private modalController: ModalController,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group(
            {
                from: new FormControl(this.animalQuery.from),
                letter: new FormControl(this.animalQuery.letter),
                status: new FormControl(this.animalQuery.status),
                name: new FormControl(this.animalQuery.name, [Validators.maxLength(15), Validators.minLength(3)])
            });
        this.eventEmitter.subscribe((event: boolean) => {
            if (event) {
                this.modalController.dismiss();
            }
        });
    }

    public ngOnInit(): void {
        this.loading = true;
        this.listAnimals(this.animalQuery);
    }

    public isEqual(): boolean {
        return JSON.stringify(this.animalQuery) === JSON.stringify(this.form.value);
    }

    public search(): void {
        if (!this.isEqual()) {
            this.animalQuery = this.form.value;
            this.animalQuery.from = 0;
            this.listAnimals(this.animalQuery);
        }
    }

    public setValue(item: string, field: string): void {
        this.form.patchValue({[field]: item});
        this.form.markAsTouched();
    }

    public listAnimals(query: AnimalQuery): void {
        this.animalService.retrieveAll(query).subscribe((animals: Array<Animal>) => {
            const length = animals.length;
            this.endOfResults = length < 20;
            if (this.animalQuery.from !== 0) {
                for (let i = 0; i < length; i++) {
                    this.animals.push(animals[i]);
                }
            } else {
                this.animals = animals;
            }
            this.loading = false;
        });
    }

    public loadMore(): void {
        this.loading = true;
        this.animalQuery.from = this.animals.length;
        this.listAnimals(this.animalQuery);
    }

    public async openModal(animal: Animal): Promise<void> {
        const modal = await this.modalController.create(
            {
                component: AnimalCardComponent,
                componentProps: {data: animal, button: 'Back', event: this.eventEmitter}
            });
        await modal.present();
    }

    public logScrolling(event: CustomEvent): void {
        this.showScrollToTopButton = event.detail.currentY > 0;
    }

    public scrollToTop(): void {
        this.content.scrollToTop(300);
    }
}
