import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimalPrototype } from '../../../models/animal/prototype';
import { AnimalService } from '../../../infrastructure/services/animals.service';
import { Report } from '../../../models/report/prototype';
import { ToastProvider } from '../../../infrastructure/providers/toast';

@Component({
    selector: 'animal-card',
    templateUrl: './animalCard.component.html',
    styleUrls: ['./animalCard.component.scss']
})

export class AnimalCardComponent {

    constructor(
        private animalService: AnimalService,
        private toast: ToastProvider
    ) {
    }

    @Input() public data: AnimalPrototype|null = null;
    @Input() public button = 'Back';
    @Output() event = new EventEmitter<boolean>();

    public getImage(status: string): string {
        return `assets/icon/${status.replace(' ', '_').toLowerCase()}.png`;
    }

    public reportData(animal: AnimalPrototype): void {
        this.animalService.reportData(animal).subscribe((report: Report) => {
            this.toast.presentToastWithOptions(
                `Thank you for reporting ${ report.commonName }!`,
                3000,
                'success-toast',
                'top'
            );
        });
    }

    public emitEvent() {
        this.event.emit(true);
    }
}
