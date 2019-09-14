import { Injectable } from '@angular/core';
import { Validator as ValidatorInterface } from '../../infrastructure/contracts/validator';
import { AnimalPrototype } from '../../infrastructure/animal/prototype';

@Injectable()
class Validator implements ValidatorInterface<AnimalPrototype> {
    public validate(prototype: AnimalPrototype): boolean {
        if (prototype.commonName !== '' || prototype.scientificName !== '') {
            return true;
        }

        return false;
    }
}

export { Validator as AnimalValidator };
