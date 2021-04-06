import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'menu'
    },
    {
        path: 'menu',
        loadChildren: './modules/components/menu#MenuModule',
    },
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
export class AppRoutingModule {}
