import { Validator } from './validator';

export abstract class Mapper<M, P> {
    protected validator: Validator<P>;

    protected constructor(validator: Validator<P>) {
        this.validator = validator;
    }

    public instance(prototype: P): M {
        if (!this.validator.validate(prototype)) {
            throw new DOMException('Failed executing prototype validation!');
        }
        return Object.freeze(this.map(prototype));
    }

    public prototype(object: M): P {
        return Object.assign<P, M>({} as P, object);
    }

    protected abstract map(data: P): M;
}
