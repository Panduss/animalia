import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RandomAnimalPage} from 'src/app/components/pages/randomAnimal';
import {RouterModule, Routes} from '@angular/router';
import {CardModule} from '../components/card';
import {IonicModule} from '@ionic/angular';

const routes: Routes = [
    {
        path: '',
        component: RandomAnimalPage
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
        RandomAnimalPage
    ],
    exports: [
        RandomAnimalPage
    ]
})
export class RandomAnimalModule {
}

