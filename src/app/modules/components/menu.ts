import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from '../../components/components/menu';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule.forChild()
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
