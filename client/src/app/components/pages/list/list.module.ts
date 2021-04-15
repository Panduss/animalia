import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AnimalService } from '../../../infrastructure/services/animals.service';
import { AnimalCardModule } from '../../components/animalCard/animalCard.module';
import { ListPage } from './list.component';
import { TabModule } from '../../components/tab/tab.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [
    {
        path: '',
        component: ListPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes),
        AnimalCardModule,
        TabModule,
        MatExpansionModule,
        MatDividerModule,
        ReactiveFormsModule
    ],
    providers: [AnimalService],
    declarations: [ListPage],
    exports: [ListPage]
})
export class ListModule {
}

