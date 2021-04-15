import { Injectable } from '@angular/core';
import { Animal } from '../../models/animal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReadService } from '../contracts/services/read';
import { Report } from '../../models/report';
import { AnimalQuery } from '../../models/animalQuery';

@Injectable()
export class AnimalService implements ReadService<Animal> {

    public constructor(
        private http: HttpClient
    ) {
    }

    public retrieveRandom(): Observable<Animal> {
        return this.http.get<Animal>(`${ environment.api }/random`);
    }

    public retrieve(id: string): Observable<Animal> {
        return this.http.get<Animal>(`${ environment.api }/${ id }`);
    }

    public retrieveAll(query: AnimalQuery): Observable<Array<Animal>> {
        return this.http.post<Array<Animal>>(`${ environment.api }`, { query });
    }

    public addAnimals(animals: Array<Animal>): Observable<Array<Animal>> {
        return this.http.post<Array<Animal>>(`${ environment.api }/add`, { animals });
    }

    public reportData(animal: Animal): Observable<Report> {
        const report = {
            commonName: animal.commonName,
            animalId: animal.id
        };
        return this.http.post<Report>(`${ environment.api }/report`, report);
    }
}
