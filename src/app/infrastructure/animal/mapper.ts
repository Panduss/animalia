import { Injectable, NgModule } from '@angular/core';
import { AnimalValidator } from '../../domain/animal/validator';
import { Mapper as MapperInterface } from '../contracts/mapper';
import { Animal } from '../../domain/animal/model';
import { AnimalPrototype } from './prototype';

@Injectable()
@NgModule({
  providers: [
    AnimalValidator
  ]
})
class Mapper extends MapperInterface<Animal, AnimalPrototype> {
  public constructor(validator: AnimalValidator) {
  super(validator);
  }

  protected map(data: AnimalPrototype): Animal {

    return new Animal(
      data.commonName,
      data.scientificName,
      data.description,
      data.image
    );
  }
}

export { Mapper as AnimalMapper };
