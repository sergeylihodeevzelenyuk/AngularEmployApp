import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpResponseDataModifierService } from './http-response-data-modifier.service';

export class BaseService<T> extends HttpResponseDataModifierService<T> {
  constructor(
    protected http: HttpClient,
    protected url: URL,
    protected serverName: string
  ) {
    super();
  }

  public fetchAll(): Observable<T[]> {
    if ((this.serverName = environment.SERVERS_NAME.FIREBASE)) {
      return this.http
        .get<T[]>(`${this.url.href}.json`)
        .pipe(map(this.firebaseDataModifier));
    }

    return this.http.get<T[]>(this.url.href);
  }

  public fetch(id: string): Observable<T> {
    if ((this.serverName = environment.SERVERS_NAME.FIREBASE)) {
      return this.http
        .get<T>(`${this.url.href}/${id}.json`)
        .pipe(map((fetchedItem) => ({ ...fetchedItem, id })));
    }

    return this.http.get<T>(this.url.href);
  }

  public add(item: T): Observable<{ [key: string]: string }> {
    if ((this.serverName = environment.SERVERS_NAME.FIREBASE)) {
      return this.http.post<{ [key: string]: string }>(
        `${this.url.href}.json`,
        item
      );
    }

    return this.http.post<{ [key: string]: string }>(this.url.href, item);
  }

  public edit(item: T, id: string): Observable<any> {
    if ((this.serverName = environment.SERVERS_NAME.FIREBASE)) {
      return this.http.put<{ [key: string]: string }>(
        `${this.url}/${id}.json`,
        item
      );
    }

    return this.http.put<{ [key: string]: string }>(this.url.href, item);
  }

  public delete(id: string): Observable<any> {
    if ((this.serverName = environment.SERVERS_NAME.FIREBASE)) {
      return this.http.delete<void>(`${this.url.href}/${id}.json`);
    }

    return this.http.delete<void>(this.url.href);
  }
}
