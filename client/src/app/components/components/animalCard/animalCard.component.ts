import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../infrastructure/services/animals.service';
import { Report } from '../../../models/report';
import { ToastProvider } from '../../../infrastructure/providers/toast';
import { statuses } from '../../../../assets/statuses';

@Component({
    selector: 'animal-card',
    templateUrl: './animalCard.component.html'
})

export class AnimalCardComponent {

    private statuses = statuses;

    constructor(
        private animalService: AnimalService,
        private toast: ToastProvider
    ) {
    }

    @Input() public data: Animal|null = null;
    @Input() public button = 'Back';
    @Output() event = new EventEmitter<boolean>();

    public getImage(name: string): string {
        return statuses.find((item) => item.id === name)!.png;
    }

    public reportData(animal: Animal): void {
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
