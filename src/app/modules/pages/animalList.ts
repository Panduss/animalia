import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalListPage } from 'src/app/components/pages/animalList';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from '../components/card';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../components/header';

const routes: Routes = [
    {
        path: '',
        component: AnimalListPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes),
        CardModule,
        HeaderModule
    ],
    declarations: [
        AnimalListPage
    ],
    exports: [
        AnimalListPage
    ]
})
export class AnimalListModule {
}

