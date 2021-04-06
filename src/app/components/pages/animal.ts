import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from '../../models/animal/model';
import { AnimalService } from '../../infrastructure/services/service';

@Component({
               selector: 'app-animal',
               templateUrl: '../../templates/pages/animal.html'
           })

export class AnimalPage implements OnInit {

    public animal: Animal = new Animal('', '');

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
        this.animalService.retrieve().subscribe((animal: Animal) => {
            this.animal = animal;
        });
    }

    public reportData(animal: Animal): void {
        this.animalService.reportData(animal);
    }
}
