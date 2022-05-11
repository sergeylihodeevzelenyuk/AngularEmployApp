import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

export abstract class BaseService<T> {
  constructor(protected http: HttpClient, protected URL: string) {}

  fetchAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.URL}.json`).pipe(map(this.modifyData));
  }

  fetch(id: string): Observable<T> {
    return this.http
      .get<T>(`${this.URL}/${id}.json`)
      .pipe(map((fetchedEmployee) => ({ ...fetchedEmployee, id })));
  }

  add(employee: T): Observable<{ [key: string]: string }> {
    return this.http.post<{ [key: string]: string }>(
      `${this.URL}.json`,
      employee
    );
  }

  edit(employee: T, id: string): Observable<any> {
    return this.http.put<{ [key: string]: string }>(
      `${this.URL}/${id}.json`,
      employee
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<void>(`${this.URL}/${id}.json`);
  }

  private modifyData(response: any): T[] {
    const modifiedEmployees: T[] = [];

    for (let key in response) {
      modifiedEmployees.push({ ...response[key], id: key });
    }

    return modifiedEmployees;
  }
}
