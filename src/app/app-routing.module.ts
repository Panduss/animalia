import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { AnimalResolver } from './infrastructure/animal/resolver';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'random-animal'
    },
    {
        path: 'random-animal',
        loadChildren: './modules/pages/randomAnimal#RandomAnimalModule',
        resolve: {
            animal: AnimalResolver
        },
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'random-animal/:id',
        loadChildren: './modules/pages/randomAnimal#RandomAnimalModule',
        resolve: {
            animal: AnimalResolver
        },
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'animal-details/:id',
        loadChildren: './modules/pages/animalDetails#AnimalDetailsModule'
    }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes,
        {
            preloadingStrategy: PreloadAllModules,
            onSameUrlNavigation: 'reload'
        }),
      AnimalResolver
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
