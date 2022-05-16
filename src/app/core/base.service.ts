import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpResponseDataModifierService } from './http-response-data-modifier.service';

export abstract class BaseService<
  T
> extends HttpResponseDataModifierService<T> {
  constructor(
    protected http: HttpClient,
    protected url: URL,
    protected serverName: string
  ) {
    super();
  }

  public fetchAll(): Observable<T[]> {
    let url = this.url.href;

    if ((this.serverName = environment.SERVERS_NAME.FIREBASE)) {
      url = `${this.url.href}.json`;

      return this.http.get<T[]>(url).pipe(map(this.firebaseDataModifier));
    }

    return this.http.get<T[]>(url);
  }

  public fetch(id: string): Observable<T> {
    let url = this.url.href;

    if ((this.serverName = environment.SERVERS_NAME.FIREBASE)) {
      url = `${this.url.href}/${id}.json`;

      return this.http
        .get<T>(url)
        .pipe(map((fetchedItem) => ({ ...fetchedItem, id })));
    }

    return this.http.get<T>(url);
  }

  public add(item: T): Observable<{ [key: string]: string }> {
    let url = this.url.href;

    if ((this.serverName = environment.SERVERS_NAME.FIREBASE)) {
      url = `${this.url.href}.json`;
    }

    return this.http.post<{ [key: string]: string }>(url, item);
  }

  public edit(item: T, id: string): Observable<any> {
    let url = this.url.href;

    if ((this.serverName = environment.SERVERS_NAME.FIREBASE)) {
      url = `${this.url}/${id}.json`;
    }

    return this.http.put<{ [key: string]: string }>(url, item);
  }

  public delete(id: string): Observable<any> {
    let url = this.url.href;

    if ((this.serverName = environment.SERVERS_NAME.FIREBASE)) {
      url = `${this.url.href}/${id}.json`;
    }

    return this.http.delete<void>(url);
  }
}
