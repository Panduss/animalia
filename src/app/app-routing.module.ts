import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'random-animal'
    },
    {
        path: 'random-animal',
        loadChildren: './modules/pages/randomAnimal#RandomAnimalModule'
    },
    {
        path: 'animal-details',
        loadChildren: './modules/pages/animalDetails#AnimalDetailsModule'
    }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
