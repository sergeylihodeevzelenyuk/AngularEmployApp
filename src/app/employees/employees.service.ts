import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";

import { Employee } from "./employee.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EmployeesService {
  private _employees: Employee[] = [];
  private URL = environment.URL.EMPLOYEE;

  constructor(private http: HttpClient) {}

  fetchEmployees() {
    return this.http.get<Employee[]>(this.URL + ".json").pipe(
      map(this.modifyFetchingData),
      tap((employees) => (this._employees = [...employees]))
    );
  }

  addEmployee(employeeObj: Employee) {
    return this.http.post<{ [key: string]: string }>(
      this.URL + ".json",
      employeeObj
    );
  }

  editEmployee(employeeObj: Employee, id: string) {
    return this.http.put<{ [key: string]: string }>(
      `${this.URL}/${id}.json`,
      employeeObj
    );
  }

  deleteEmployee(id: string) {
    return this.http.delete<{ [key: string]: string }>(
      `${this.URL}/${id}.json`
    );
  }

  get employees() {
    return this._employees;
  }

  getEmployeeById(id: string) {
    return this._employees.find((item) => item.id === id);
  }

  private modifyFetchingData(employees: any): Employee[] {
    const modifiedEmployees: Employee[] = [];

    for (let key in employees) {
      modifiedEmployees.push({ ...employees[key], id: key });
    }

    return modifiedEmployees;
  }
}
