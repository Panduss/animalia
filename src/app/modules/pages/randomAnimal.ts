import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomAnimalPage } from 'src/app/components/pages/randomAnimal';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from '../components/card';
import { IonicModule } from '@ionic/angular';
import { AnimalService } from '../../infrastructure/animal/service';

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
              providers: [AnimalService],
              declarations: [RandomAnimalPage],
              exports: [RandomAnimalPage]
          })
export class RandomAnimalModule {
}

