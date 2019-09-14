import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsPage } from 'src/app/components/pages/news';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from '../components/card';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../components/header';

const routes: Routes = [
    {
        path: '',
        component: NewsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes),
        CardModule,
        HeaderModule
    ],
    declarations: [
        NewsPage
    ],
    exports: [
        NewsPage
    ]
})
export class NewsModule {
}

