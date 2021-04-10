import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimalPrototype } from '../../models/animal/prototype';
import { IonContent } from '@ionic/angular';
import { AnimalService } from '../../infrastructure/services/animals.service';

@Component({
    selector: 'app-animal-list',
    templateUrl: '../../templates/pages/animalList.html'
})
export class AnimalListPage implements OnInit {

    @ViewChild(IonContent, { static: true }) content!: IonContent;
    public animals: Array<AnimalPrototype> = [];
    public showScrollToTopButton = false;
    public mappedAnimals: Array<any> = [];
    public from = 0;

    public constructor(
        private animalService: AnimalService
    ) {
    }

    public ngOnInit() {
        this.listAnimals(this.from);
    }

    public separateAnimalsAlphabetically(record: AnimalPrototype, recordIndex: number, records: Array<AnimalPrototype>) {
        const currentLetter = record.commonName.charAt(0);
        // return null if there are no more elements
        if (!records[recordIndex + 1]) {
            return null;
        }
        // return first letter for header
        if (recordIndex === 0) {
            return currentLetter.toUpperCase();
        }
        const previousLetter = records[recordIndex - 1].commonName.charAt(0);
        // return new letter for the header when current letter is different
        if (previousLetter !== currentLetter) {
            return currentLetter.toUpperCase();
        }
        return null;
    }

    public logScrolling(event: CustomEvent): void {
        this.showScrollToTopButton = event.detail.currentY > 0;
    }

    public scrollToTop() {
        this.content.scrollToTop(300);
    }

    public listAnimals(from: number): void {
        this.animalService.retrieveAll(from).subscribe((animals) => {
            this.animals = this.animals.concat(animals);
        });
    }

    public loadMore(event: any) {
        this.listAnimals(this.animals.length);
        event.target.complete();
    }
}
