import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalsPage } from 'src/app/components/pages/animals';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from '../components/card';
import { IonicModule } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { HeaderModule } from '../components/header';

const routes: Routes = [
    {
        path: '',
        component: AnimalsPage
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
        AngularFirestore
    ],
    declarations: [
        AnimalsPage
    ],
    exports: [
        AnimalsPage
    ]
})
export class AnimalsModule {
}

