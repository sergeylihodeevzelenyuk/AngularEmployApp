import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpResponseDataModifierService } from './http-response-data-modifier.service';

export abstract class BaseService<
  T
> extends HttpResponseDataModifierService<T> {
  constructor(
    private http: HttpClient,
    private url: URL,
    private serverName: string
  ) {
    super();
  }

  public fetchAll(): Observable<T[]> {
    let url = this.url.href;
    let cb = (value: T[]) => value;

    if ((this.serverName = environment.SERVERS_NAME.FIREBASE)) {
      url = `${this.url.href}.json`;
      cb = this.firebaseDataModifier;
    }

    return this.http.get<T[]>(url).pipe(map(cb));
  }

  public fetch(id: string): Observable<T> {
    let url = this.url.href;
    let cb = (value: T) => value;

    if ((this.serverName = environment.SERVERS_NAME.FIREBASE)) {
      url = `${this.url.href}/${id}.json`;
      cb = (fetchedItem) => ({ ...fetchedItem, id });
    }

    return this.http.get<T>(url).pipe(map(cb));
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
