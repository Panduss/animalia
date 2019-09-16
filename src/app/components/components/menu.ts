import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-menu',
    templateUrl: '../../templates/components/menu.html',
    styleUrls: ['../../styles/components/menu.scss']
})
class Menu implements OnInit, OnDestroy {

    public selectedPath?: string;
    private routeSubscription: Subscription = new Subscription();

    public pages = [
        {
            title: 'Animals',
            url: '/menu/animals'
        },
        {
            title: 'Animal list A-Z',
            url: '/menu/animal-list'
        }
    ];

    public constructor(
        private router: Router
    ) {
    }

    public ngOnInit(): void {
        this.routeSubscription = this.router.events.subscribe(
            (event) => {
                if (event instanceof NavigationEnd) {
                    this.selectedPath = event.urlAfterRedirects;
                }
            }
        );
    }

    public ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}

export { Menu as MenuComponent };