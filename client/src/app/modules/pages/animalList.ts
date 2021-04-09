import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from '../components/card';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../components/header';
import { AnimalService } from '../../infrastructure/services/animals.service';
import { AnimalListPage } from '../../components/pages/animalList';

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
    providers: [AnimalService],
    declarations: [
        AnimalListPage
    ],
    exports: [
        AnimalListPage
    ]
})
export class AnimalListModule {
}

