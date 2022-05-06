import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { Employee } from "./employee.model";
import { EmployeesService } from "./employees.service";

@Injectable({
  providedIn: "root",
})
export class EmployeesResolverService implements Resolve<Employee[]> {
  employees!: Employee[];

  constructor(private employeesServ: EmployeesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.employeesServ.employees.length === 0) {
      this.employeesServ.fetchEmployees();

      this.employeesServ.employeesSub.subscribe(
        (employees) => (this.employees = employees)
      );

      return this.employees;
    }

    return this.employeesServ.employees;
  }
}
