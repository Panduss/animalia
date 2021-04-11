import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AnimalCardComponent } from './animalCard.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    entryComponents: [AnimalCardComponent],
    declarations: [AnimalCardComponent],
    exports: [AnimalCardComponent]
})
export class AnimalCardModule {
}
