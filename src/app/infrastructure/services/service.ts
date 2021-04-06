import { Injectable } from '@angular/core';
import { ReadService } from '../contracts/services/read';
import { AnimalPrototype, WikiResponsePrototype } from '../../models/animal/prototype';
import { HttpClient } from '@angular/common/http';
import * as animalsDb from '../../models/animal/animalsDb.json';
import { map } from 'rxjs/operators';
import { Animal } from '../../models/animal/model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AnimalService implements ReadService<Animal> {

    public animal: AnimalPrototype;
    private animals = animalsDb.FULL_LIST;

    public constructor(
        private http: HttpClient
    ) {
        this.animal = this.getRandomAnimal();
    }

    public retrieve(): Observable<Animal> {
        this.animal = this.getRandomAnimal();
        const query = `titles=${ this.animal.commonName.split(' ').join('_') }`;
        return this.getWikiData(query);
    }

    private getWikiData(query: string): Observable<Animal> {
        return this.http.get<WikiResponsePrototype>(
            `${environment.wikipedia.baseUrl }${ query }${ environment.wikipedia.getThumbnail }`
        ).pipe(map((response: WikiResponsePrototype) => {
            const page = response.query.pages[0];
            return new Animal(
                this.animal.commonName,
                this.animal.scientificName,
                page.extract && (page.extract),
                page.thumbnail && page.thumbnail.source && (page.thumbnail.source)
            );
        }));
    }

    private getRandomAnimal(): AnimalPrototype {
        return this.animals[Math.floor(Math.random() * this.animals.length)];
    }
}
