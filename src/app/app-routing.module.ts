import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: 'animal-details',
        loadChildren: './modules/pages/animalDetails#AnimalDetailsModule'
    }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {  onSameUrlNavigation: 'reload' }),
      AnimalResolver
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
