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
  constructor(private employeesServ: EmployeesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const employees = this.employeesServ.employees;

    if (employees.length === 0) {
      return this.employeesServ.fetchEmployees();
    }

    return employees;
  }
}
