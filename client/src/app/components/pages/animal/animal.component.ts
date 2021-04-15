import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../../infrastructure/services/animals.service';
import { Animal } from '../../../models/animal';

@Component({
    selector: 'app-animal',
    templateUrl: './animal.component.html'
})

export class AnimalPage implements OnInit {

    public animal: Animal | null = null;

    public constructor(
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private animalService: AnimalService
    ) {
    }

    public ngOnInit(): void {
        this.getRandomAnimal();
    }

    public getRandomAnimal(): void {
        this.animalService.retrieveRandom().subscribe((animal: Animal) => {
            this.animal = animal;
        });
    }
}
