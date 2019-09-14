import { Injectable } from '@angular/core';
import { Mapper as MapperInterface } from '../contracts/mapper';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Collection } from '../collection/collection';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ReadService } from '../contracts/services/read';

@Injectable()
abstract class Resolver<T, P, M extends MapperInterface<T, P>, S extends ReadService<P>> implements Resolve<Collection<T>> {
    protected constructor(
        protected service: S,
        protected mapper: M
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Collection<T>> {
        return this.resolveObjects(route.params.id);
    }

    public resolveObjects(id?: string | number): Observable<Collection<T>> {
        return this.service
            .retrieve(id)
            .map((collection: Collection<P>) => {
                return collection.convert<T>(this.mapper.instance.bind(this.mapper));
            }).catch(() => {
                return Observable.of<Collection<T>>(Collection.of<T>([]));
            });
    }
}

export { Resolver as ModelResolver };

