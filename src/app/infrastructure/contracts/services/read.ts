import { Observable } from 'rxjs';

export interface ReadService<T> {
    retrieve(id?: number | string): Observable<T>;
}
