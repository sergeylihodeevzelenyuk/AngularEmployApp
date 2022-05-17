import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { DataModifier } from './http-responce-handle-services/data-modifier.interface';
import { DATA_MODIFIERS } from './http-responce-handle-services/data-modifier.token';

export class BaseService<T> {
  allDataModifier!: (data: any) => any;
  itemDataModifier!: (data: any, id: string) => any;

  constructor(
    protected http: HttpClient,
    @Inject(DATA_MODIFIERS)
    protected dataModifires: ReadonlyArray<DataModifier>,
    protected url: URL,
    protected serverName: string
  ) {
    this.setInitialSetup();
  }

  public fetchAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url.href).pipe(map(this.allDataModifier));
  }

  public fetch(id: string): Observable<T> {
    return this.http
      .get<T>(`${this.url.href}/${id}`)
      .pipe(map((fetchedItem) => this.itemDataModifier(fetchedItem, id)));
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

  private get isFirebaseServer(): boolean {
    return this.serverName === environment.SERVERS_NAME.FIREBASE;
  }

  private setInitialSetup(): void {
    this.allDataModifier = this.dataModifires[0].allDataModifier;
    this.itemDataModifier = this.dataModifires[0].itemDataModifier;

    if (this.isFirebaseServer) {
      this.allDataModifier = this.dataModifires[1].allDataModifier;
      this.itemDataModifier = this.dataModifires[1].itemDataModifier;
    }
  }
}
