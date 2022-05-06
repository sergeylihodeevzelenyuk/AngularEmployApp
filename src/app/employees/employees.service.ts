import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "./employee.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EmployeesService {
  private _employees: Employee[] = [];
  private URL = environment.URL.EMPLOYEE;
  employeesSub = new Subject<Employee[]>();
  isFetchingSub = new Subject<boolean>();
  errorSub = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  get employees() {
    return this._employees;
  }

  getEmployeeById(id: string) {
    return this._employees.find((item) => item.id === id);
  }

  fetchEmployees() {
    this.http
      .get<Employee[]>(this.URL + ".json")
      .pipe(map(this.modifyFetchingData))
      .subscribe((employees) => {
        this._employees = [...employees];
        this.employeesSub.next(this._employees);
        this.isFetchingSub.next(false);
      });
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

  private modifyFetchingData(employees: Employee[]) {
    const modifiedEmployees: Employee[] = [];
    for (let key in employees) {
      modifiedEmployees.push({ ...employees[key], id: key });
    }

    return modifiedEmployees;
  }
}
