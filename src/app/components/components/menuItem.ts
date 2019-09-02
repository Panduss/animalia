import { Component, Input } from '@angular/core';

@Component({
    selector: 'menu-item',
    templateUrl: '../../templates/components/menuItem.html'
})
class MenuItem {

    @Input() public tabName: string = '';
    @Input() public tabIcon: string = '';
    @Input() public tabText: string = '';
}

export { MenuItem as MenuItemComponent };
