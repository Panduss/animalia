import { Injectable, NgModule } from '@angular/core';
import { AnimalMapper } from './mapper';
import { AnimalPrototype } from './prototype';
import { ModelResolver } from '../resolvers/model';
import { Animal } from '../../domain/animal/model';
import { AnimalService } from './service';

@Injectable()
@NgModule({
  imports: [
    AnimalMapper
  ],
  providers: [
    AnimalService
  ]
})
class Resolver extends ModelResolver <Animal, AnimalPrototype, AnimalMapper, AnimalService> {
  public constructor(
    service: AnimalService,
    mapper: AnimalMapper
  ) {
    super(service, mapper);
  }
}

export { Resolver as AnimalResolver };
