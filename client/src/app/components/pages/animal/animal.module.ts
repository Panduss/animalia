import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AnimalService } from '../../../infrastructure/services/animals.service';
import { AnimalPage } from './animal.component';
import { AnimalCardModule } from '../../components/animalCard/animalCard.module';
import { TabModule } from '../../components/tab/tab.module';

const routes: Routes = [
    {
        path: '',
        component: AnimalPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes),
        AnimalCardModule,
        TabModule
    ],
    providers: [
        AnimalService
    ],
    declarations: [
        AnimalPage
    ],
    exports: [
        AnimalPage
    ]
})
export class AnimalModule {
}

