import { Component, ViewChild } from '@angular/core';
import * as animalsDb from '../../models/animal/animalsDb.json';
import { AnimalPrototype } from '../../models/animal/prototype';
import { IonContent } from '@ionic/angular';

interface Section {
    title: string;
    data: Array<AnimalPrototype>;
}
@Component({
               selector: 'app-animal-list',
               templateUrl: '../../templates/pages/animalList.html'
           })
export class AnimalListPage {

    @ViewChild(IonContent) content!: IonContent;
    public animals: Array<AnimalPrototype> = animalsDb.FULL_LIST;
    public showScrollToTopButton = false;

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
}
