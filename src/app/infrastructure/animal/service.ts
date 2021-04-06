import { Injectable } from '@angular/core';
import { ReadService } from '../contracts/services/read';
import { AnimalPrototype, WikiResponsePrototype } from './prototype';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../collection/collection';
import { AppCustomConfig } from '../../../config/general';
import * as animalsDb from '../../domain/animal/animalsDb.json';
import { map } from 'rxjs/operators';
import { Animal } from '../../domain/animal/model';
import { Observable } from 'rxjs';

@Injectable()
export class AnimalService implements ReadService<Animal> {

    private animal: AnimalPrototype;
    private animals = animalsDb.FULL_LIST;

    public constructor(
        private http: HttpClient
    ) {
        this.animal = this.getRandomAnimal();
    }

    public retrieve(): Observable<Collection<Animal>> {
        const query = `titles=${ this.getRandomAnimal().commonName.split(' ').join('_') }`;
        return this.getAnimalDataFromWikipedia(query);
    }

    private getAnimalDataFromWikipedia(query: string): Observable<Collection<Animal>> {
        return this.http.get<WikiResponsePrototype>(
            `${ AppCustomConfig.wikipedia.baseUrl }${ query }${ AppCustomConfig.wikipedia.getThumbnail }`
        ).pipe(map((response: WikiResponsePrototype) => {
            const page = response.query.pages[0];
            return Collection.of(new Animal(
                this.animal.commonName,
                this.animal.scientificName,
                page.extract && (page.extract),
                page.thumbnail && page.thumbnail.source && (page.thumbnail.source)
            ));
        }));
    }

    private getRandomAnimal(): AnimalPrototype {
        return this.animals[Math.floor(Math.random() * this.animals.length)];
    }
}
