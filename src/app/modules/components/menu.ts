import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from '../../components/components/menu';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: MenuComponent,
        children: [
            {
                path: '',
                redirectTo: 'animal',
                pathMatch: 'full'
            },
            {
                path: 'animal',
                loadChildren: '../pages/animal#AnimalModule'
            },
            {
                path: 'animal-list',
                loadChildren: '../pages/animalList#AnimalListModule'
            }
        ]
    }
];

@NgModule({
              imports: [
                  CommonModule,
                  IonicModule,
                  TranslateModule.forChild(),
                  RouterModule.forChild(routes)
              ],
              exports: [
                  MenuComponent
              ],
              declarations: [
                  MenuComponent
              ]
          })
class Menu {
}

export { Menu as MenuModule };
