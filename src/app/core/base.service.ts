import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataModifier } from './http-data-modifier-services/data-modifier.interface';
import { DATA_MODIFIERS } from './http-data-modifier-services/data-modifier.token';
import { ServersNames } from './http-data-modifier-services/servers.enum';

export class BaseService<T> {
  allDataModifier!: (data: any) => any;
  itemDataModifier!: (data: any, id: string) => any;

  constructor(
    protected http: HttpClient,
    @Inject(DATA_MODIFIERS)
    protected dataModifires: ReadonlyArray<DataModifier>,
    protected url: URL,
    protected serverName: number
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

  private isServer(serverName: number): boolean {
    return this.serverName === serverName;
  }

  private setInitialSetup(): void {
    let index = ServersNames.typical;

    this.allDataModifier = this.dataModifires[index].allDataModifier;
    this.itemDataModifier = this.dataModifires[index].itemDataModifier;

    if (this.isServer(ServersNames.firebase)) {
      index = ServersNames.firebase;

      this.allDataModifier = this.dataModifires[index].allDataModifier;
      this.itemDataModifier = this.dataModifires[index].itemDataModifier;
    }
  }
}
