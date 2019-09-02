import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/components/card';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ CardComponent ],
  exports: [ CardComponent ]
})
export class CardModule {
}
