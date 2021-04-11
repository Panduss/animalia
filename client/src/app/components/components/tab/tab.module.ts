import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TabComponent } from './tab.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule.forChild(),
    ],
    exports: [
        TabComponent
    ],
    declarations: [
        TabComponent
    ]
})
export class TabModule {
}
