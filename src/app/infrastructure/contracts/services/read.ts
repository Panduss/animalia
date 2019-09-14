import { Observable } from 'rxjs';
import { Collection } from '../../collection/collection';

export interface ReadService<T> {
    retrieve(id?: number | string): Observable<Collection<T>>;
}
