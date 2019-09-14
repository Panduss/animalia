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
                redirectTo: 'random-animal',
                pathMatch: 'full'
            },
            {
                path: 'random-animal',
                loadChildren: '../pages/randomAnimal#RandomAnimalModule',
                resolve: {
                    animal: AnimalResolver
                },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'news',
                loadChildren: '../pages/news#NewsModule'
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
