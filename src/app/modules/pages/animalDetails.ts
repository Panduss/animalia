import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalDetailsPage } from 'src/app/components/pages/animalDetails';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from '../components/card';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
    {
        path: '',
        component: AnimalDetailsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes),
        CardModule
    ],
    declarations: [
        AnimalDetailsPage
    ],
    exports: [
        AnimalDetailsPage
    ]
})
export class AnimalDetailsModule {
}

