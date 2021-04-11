import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/animal',
        pathMatch: 'full'
    },
    {
        path: 'animal',
        loadChildren: './components/pages/animal/animal.module#AnimalModule'
    },
    {
        path: 'list',
        loadChildren: './components/pages/list/list.module#ListModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes,
            {
                preloadingStrategy: PreloadAllModules,
                onSameUrlNavigation: 'reload'
            })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
