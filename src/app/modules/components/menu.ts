import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from '../../components/components/menu';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalResolver } from '../../infrastructure/animal/resolver';

const routes: Routes = [
    {
        path: '',
        component: MenuComponent,
        children: [
            {
                path: '',
                redirectTo: 'animals',
                pathMatch: 'full'
            },
            {
                path: 'animals',
                loadChildren: '../pages/animals#AnimalsModule',
                resolve: {
                    animal: AnimalResolver
                },
                runGuardsAndResolvers: 'always'
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
        RouterModule.forChild(routes),
        AnimalResolver
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
