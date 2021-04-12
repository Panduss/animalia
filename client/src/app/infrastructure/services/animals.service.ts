import { Injectable } from '@angular/core';
import { AnimalPrototype } from '../../models/animal/prototype';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReadService } from '../contracts/services/read';
import { Report } from '../../models/report/prototype';

@Injectable()
export class AnimalService implements ReadService<AnimalPrototype> {

    public constructor(
        private http: HttpClient
    ) {
    }

    public retrieveRandom(): Observable<AnimalPrototype> {
        return this.http.get<AnimalPrototype>(`${ environment.api }/random`);
    }

    public retrieve(id: string): Observable<AnimalPrototype> {
        return this.http.get<AnimalPrototype>(`${ environment.api }/${ id }`);
    }

    public retrieveAll(from: number): Observable<Array<AnimalPrototype>> {
        return this.http.post<Array<AnimalPrototype>>(`${ environment.api }`, { from });
    }

    public addAnimals(animals: Array<AnimalPrototype>): Observable<Array<AnimalPrototype>> {
        return this.http.post<Array<AnimalPrototype>>(`${ environment.api }/add`, { animals });
    }

    public reportData(animal: AnimalPrototype): Observable<Report> {
        const report = {
            commonName: animal.commonName,
            animalId: animal.id
        };
        return this.http.post<Report>(`${ environment.api }/report`, report);
    }
}
