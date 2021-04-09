import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../infrastructure/services/animals.service';
import { AnimalPrototype } from '../../models/animal/prototype';

@Component({
    selector: 'app-animal',
    templateUrl: '../../templates/pages/animal.html'
})

export class AnimalPage implements OnInit {

    public animal: AnimalPrototype | null = null;

    public constructor(
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private animalService: AnimalService
    ) {
    }

    public ngOnInit() {
        this.getRandomAnimal();
    }

    public getRandomAnimal(): void {
        this.animalService.retrieveRandom().subscribe((animal: AnimalPrototype) => {
            this.animal = animal;
        });
    }

    public reportData(animal: AnimalPrototype): void {
        this.animalService.reportData(animal);
    }
}
