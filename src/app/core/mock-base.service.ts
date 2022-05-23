import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export abstract class MockBaseService<T> {
  url = environment.URL.EMPLOYEE.href;

  constructor(protected http: HttpClient) {}

  public fetchAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  public fetch(id: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  public add(item: T): Observable<{ [key: string]: string }> {
    return this.http.post<{ [key: string]: string }>(this.url, item);
  }

  public edit(item: T, id: string): Observable<any> {
    return this.http.put<{ [key: string]: string }>(`${this.url}/${id}`, item);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
