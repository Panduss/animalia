import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {ReadService} from '../contracts/services/read';
import {AnimalPrototype, WikipageResponsePrototype, WikiResponsePrototype} from './prototype';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Collection} from '../collection/collection';
import * as animalsDb from '../../domain/animal/animalsDb.json';
import {environment} from '../../../environments/environment';

@Injectable()
class Service implements ReadService<AnimalPrototype> {

    public animal: AnimalPrototype;
    private animals = animalsDb.FULL_LIST;

    public constructor(
        private http: HttpClient
    ) {
        this.animal = this.getRandomAnimal();
    }

    public retrieve(name?: string): Observable<Collection<AnimalPrototype>> {

        if (!name) {
            return this.returnRandomAnimal();
        }

        return this.returnOneAnimal(name);
    }

    public returnRandomAnimal(): Observable<Collection<AnimalPrototype>> {
        this.animal = this.getRandomAnimal();
        const query = `titles=${this.animal.commonName.split(' ').join('_')}`;
        return this.getAnimalDataFromWikipedia(query);
    }

    private returnOneAnimal(name: string): Observable<Collection<AnimalPrototype>> {
        const query = `titles=${name.split(' ').join('_')}`;
        return this.getAnimalDataFromWikipedia(query);
    }

    private getAnimalDataFromWikipedia(query: string): Observable<Collection<AnimalPrototype>> {
        return this.http.get<WikiResponsePrototype>(
            `${environment.wikipedia.baseUrl}${query}${environment.wikipedia.getThumbnail}`
        ).map(Collection.of).map(
            (wikiResponse: Collection<WikiResponsePrototype>) => {

                const response = wikiResponse.first();

                if (response) {
                    const pages = [response.query.pages];
                    if (pages) {
                        pages.map(
                            (page) => {
                                const wikiPage = page[0] as WikipageResponsePrototype;

                                const image = wikiPage.thumbnail.source;
                                if (image) {
                                    this.animal.image = image;
                                }

                                const description = wikiPage.extract;
                                if (description) {
                                    this.animal.description = description;
                                }

                                return this.animal;
                            });
                    }
                }
                return Collection.of(this.animal);
            }
        ).catch(
            () => {
                return Observable.of(Collection.of(this.animal));
            }
        );
    }

    public getRandomAnimal(): AnimalPrototype {
        return this.animals[Math.floor(Math.random() * this.animals.length)];
    }
}

export {Service as AnimalService};
