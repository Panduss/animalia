import { Observable } from 'rxjs';

export interface ReadService<T> {
    retrieve(id: string | number): Observable<T>;
}
