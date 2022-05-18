import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataModifier } from '../app.tokens';
import { DATA_MODIFIER_TOKEN } from '../app.tokens';

export class BaseService<T> {
  constructor(
    protected http: HttpClient,
    @Inject(DATA_MODIFIER_TOKEN)
    protected dataModifires: DataModifier,
    protected url: URL
  ) {}

  public fetchAll(): Observable<T[]> {
    return this.http
      .get<T[]>(this.url.href)
      .pipe(map(this.dataModifires.allDataModifier));
  }

  public fetch(id: string): Observable<T> {
    return this.http
      .get<T>(`${this.url.href}/${id}`)
      .pipe(
        map((fetchedItem) =>
          this.dataModifires.itemDataModifier(fetchedItem, id)
        )
      );
  }

  public add(item: T): Observable<{ [key: string]: string }> {
    return this.http.post<{ [key: string]: string }>(this.url.href, item);
  }

  public edit(item: T, id: string): Observable<any> {
    return this.http.put<{ [key: string]: string }>(`${this.url}/${id}`, item);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<void>(`${this.url.href}/${id}`);
  }
}
