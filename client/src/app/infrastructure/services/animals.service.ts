import { Injectable } from '@angular/core';
import { AnimalPrototype } from '../../models/animal/prototype';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReadService } from '../contracts/services/read';

@Injectable()
export class AnimalService implements ReadService<AnimalPrototype> {

    public constructor(
        private http: HttpClient
    ) {
    }

    public retrieveRandom(): Observable<AnimalPrototype> {
        return this.http.get<AnimalPrototype>(`${ environment.api }/animals/random`);
    }

    public retrieve(id: string): Observable<AnimalPrototype> {
        return this.http.get<AnimalPrototype>(`${ environment.api }/animals/${ id }`);
    }

    public retrieveAll(from: number): Observable<Array<AnimalPrototype>> {
        return this.http.post<Array<AnimalPrototype>>(`${ environment.api }/animals`, { from });
    }

    public addAnimals(animals: Array<AnimalPrototype>): Observable<Array<AnimalPrototype>> {
        return this.http.post<Array<AnimalPrototype>>(`${ environment.api }/animals/add`, { animals });
    }

    public reportData(animal: AnimalPrototype): void {
        // return this.http.post<AnimalPrototype>(`${ environment.api }/animals/report`, { animal });
    }
}