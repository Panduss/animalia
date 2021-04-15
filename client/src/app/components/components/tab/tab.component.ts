import { Component } from '@angular/core';
import { Event, Router, RouterEvent } from '@angular/router';

@Component({
    selector: 'custom-tab',
    templateUrl: './tab.component.html'
})
export class TabComponent {

    selectedPath = '';

    public constructor(private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof RouterEvent && event.url) {
                this.selectedPath = event.url;
            }
        });
    }

    public isActive(path: string): boolean {
        return this.selectedPath.includes(path);
    }
}
