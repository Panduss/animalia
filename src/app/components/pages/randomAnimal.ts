import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from '../../domain/animal/model';
import { AnimalService } from '../../infrastructure/animal/service';
import { Collection } from '../../infrastructure/collection/collection';

@Component({
               selector: 'app-animal-random',
               templateUrl: '../../templates/pages/randomAnimal.html'
           })

export class RandomAnimalPage implements OnInit {

    public animal: Animal | null = null;

    public constructor(
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private animalService: AnimalService
    ) {
    }

    public ngOnInit() {
        this.getAnimal();
    }

    public getAnimal(): void {
        this.animalService.retrieve().subscribe((animal: Collection<Animal>) => {
            this.animal = animal.first();
            console.log(this.animal);
        });
    }
}
