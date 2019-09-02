import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Animal} from '../../domain/animal/model';
import {AnimalService} from '../../infrastructure/animal/service';
import {AnimalPrototype} from '../../infrastructure/animal/prototype';
import {Collection} from '../../infrastructure/collection/collection';

@Component({
    selector: 'app-animal-random',
    templateUrl: '../../templates/pages/randomAnimal.html',
    styleUrls: ['../../styles/pages/randomAnimal.scss']
})

class RandomAnimal implements OnInit, OnDestroy {

    public animal: Animal;
    private dataSubscription: Subscription = new Subscription();

    public constructor(
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private animalService: AnimalService
    ) {
        this.animal = this.route.snapshot.data.animal.first();
        console.log(this.animal);
    }

    public ngOnInit() {
    }

    public ngOnDestroy() {
        this.dataSubscription.unsubscribe();
    }

    public reloadPage(): void {
        this.router.navigate(['/random-animal']);
        // location.reload(true);
    }

    public getNewAnimal(): Observable<Collection<AnimalPrototype>> {
        console.log('helo');
        return this.animalService.returnRandomAnimal();
    }
}

export {RandomAnimal as RandomAnimalPage};
