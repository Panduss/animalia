import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
class Translation implements TranslateLoader {
  constructor(
    private http: HttpClient
  ) {
  }

  public getTranslation(lang: string): Observable<{}> {
    return new Observable((subscriber: Subscriber<{}>) => {
      this.http.get(`./assets/i18n/${ lang }.json`).subscribe(
        (res: {}) => {
          subscriber.next(res);
          subscriber.complete();
        });
    });
  }
}

export { Translation as TranslationFactory };
