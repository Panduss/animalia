import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalPage } from 'src/app/components/pages/animal';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from '../components/card';
import { IonicModule } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { HeaderModule } from '../components/header';
import { AnimalService } from '../../infrastructure/services/service';

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
        AnimalService,
        AngularFirestore
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

