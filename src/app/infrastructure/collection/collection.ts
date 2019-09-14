import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

export class Collection<T> {

    private items: T[] = [];

    public constructor(items: T[]) {
        this.items = items;
    }

    public static of<T>(items: T[] | T) {
        if (!Array.isArray(items)) {
            items = [items];
        }

        return new Collection<T>(items);
    }

    public isEmpty(): boolean {
        return (this.items.length === 0);
    }

    public add(item: T): void {
        this.items.push(item);
    }

    public toObservable(): Observable<T[]> {
        return Observable.of(this.items);
    }

    public all(): T[] {
        return this.items;
    }

    public each(callback: (item: T) => T | void): void {
        for (const item of this.items) {
            callback(item);
        }
    }

    public first(): T | null {
        for (const item of this.items) {
            return item;
        }

        return null;
    }

    public count(): number {
        return this.items.length;
    }

    public filter(callback: (item: T) => boolean): Collection<T> {
        return Collection.of<T>(this.items.filter(callback));
    }

    public convert<S>(callback: (item: T) => S): Collection<S> {
        const newCollection = new Collection<S>([]);

        this.items.forEach((item: T) => {
            newCollection.add(callback(item));
        });

        return newCollection;
    }
}
