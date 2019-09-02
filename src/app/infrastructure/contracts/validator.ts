export interface Validator<P> {
    validate(prototype: P): boolean;
}
