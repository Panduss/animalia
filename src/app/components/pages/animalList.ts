import { Component, ViewChild } from '@angular/core';
import * as animalsDb from '../../models/animal/animalsDb.json';
import { AnimalPrototype } from '../../models/animal/prototype';
import { IonContent } from '@ionic/angular';

@Component({
    selector: 'app-animal-list',
    templateUrl: '../../templates/pages/animalList.html'
})

class AnimalList {

    @ViewChild(IonContent) content!: IonContent;
    public animals: Array<AnimalPrototype> = animalsDb.FULL_LIST;
    public showScrollToTopButton = false;

    public separateAnimalsAlphabetically(record: AnimalPrototype, recordIndex: number, records: Array<AnimalPrototype>) {

        if (recordIndex === 0) {
            return record.commonName.charAt(0).toUpperCase();
        }

        if (!records[recordIndex + 1] || !records[recordIndex + 2]) {
            return null;
        }

        const firstPrev = records[recordIndex - 1].commonName.charAt(0);
        const firstCurrent = record.commonName.charAt(0);

        if (firstPrev !== firstCurrent) {
            return firstCurrent.toUpperCase();
        }
        return null;
    }

    public logScrolling(event: CustomEvent): void {
        this.showScrollToTopButton = event.detail.deltaY > 0;
    }

    public scrollToTop() {
        this.content.scrollToTop(300);
    }
}

export { AnimalList as AnimalListPage };
