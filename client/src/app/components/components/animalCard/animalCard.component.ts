import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimalPrototype } from '../../../models/animal/prototype';
import { AnimalService } from '../../../infrastructure/services/animals.service';

@Component({
    selector: 'animal-card',
    templateUrl: './animalCard.component.html',
    styleUrls: ['./animalCard.component.scss']
})

export class AnimalCardComponent {

    @Input() public data: AnimalPrototype|null = null;
    @Input() public showNextButton = false;
    @Output() showNext = new EventEmitter<boolean>();

    constructor(
        private animalService: AnimalService
    ) {}

    public reportData(animal: AnimalPrototype): void {
        this.animalService.reportData(animal);
    }

    public getRandomAnimal() {
        this.showNext.emit(true);
    }

}
