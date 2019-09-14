import { Component, Input } from '@angular/core';

@Component({
    selector: 'menu-item',
    templateUrl: '../../templates/components/menuItem.html'
})
class MenuItem {

    @Input() public tabName = '';
    @Input() public tabIcon = '';
    @Input() public tabText = '';
}

export { MenuItem as MenuItemComponent };
