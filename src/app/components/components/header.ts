import { Component, Input } from '@angular/core';

@Component({
    selector: 'custom-header',
    templateUrl: '../../templates/components/header.html',
})
export class HeaderComponent {
    @Input() public title?: string;
    @Input() public hasBackButton?: boolean;
    @Input() public toolbarColor?: string;
    @Input() public hasLogo?: boolean;
}
