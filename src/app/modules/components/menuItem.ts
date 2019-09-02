import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuItemComponent } from '../../components/components/menuItem';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule.forChild()
    ],
    exports: [
        MenuItemComponent
    ],
    declarations: [
        MenuItemComponent
    ]
})
class MenuItem {
}

export { MenuItem as MenuItemModule };
