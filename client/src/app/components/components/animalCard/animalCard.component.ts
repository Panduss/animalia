import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimalPrototype } from '../../../models/animal/prototype';
import { AnimalService } from '../../../infrastructure/services/animals.service';

@Component({
    selector: 'animal-card',
    templateUrl: './animalCard.component.html',
    styleUrls: ['./animalCard.component.scss']
})

export class AnimalCardComponent {

    constructor(
        private animalService: AnimalService
    ) {
    }

    @Input() public data: AnimalPrototype|null = null;
    @Input() public button = 'Back';
    @Output() event = new EventEmitter<boolean>();

    public getImage(status: string): string {
        return `assets/icon/${status.replace(' ', '_').toLowerCase()}.png`;
    }

    public reportData(animal: AnimalPrototype): void {
        this.animalService.reportData(animal);
    }

    public emitEvent() {
        this.event.emit(true);
    }
}
