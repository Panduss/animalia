import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from '../components/card';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../components/header';
import { AnimalService } from '../../infrastructure/services/animals.service';
import { AnimalPage } from '../../components/pages/animal';

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
        CardModule,
        HeaderModule
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

