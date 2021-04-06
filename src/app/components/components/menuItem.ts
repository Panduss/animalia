import { Component, Input } from '@angular/core';

@Component({
               selector: 'menu-item',
               templateUrl: '../../templates/components/menuItem.html'
           })
export class MenuItemComponent {

    @Input() public tabName = '';
    @Input() public tabIcon = '';
    @Input() public tabText = '';
}
