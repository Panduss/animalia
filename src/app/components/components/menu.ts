import { Component, Input } from '@angular/core';

@Component({
    selector: 'menu',
    templateUrl: '../../templates/components/menu.html',
    styleUrls: ['../../styles/components/menu.scss']
})
class Menu {

    @Input() public showTab = true;
}

export { Menu as MenuComponent };