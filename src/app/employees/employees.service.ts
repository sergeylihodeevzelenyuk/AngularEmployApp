import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Employee } from "./employee.model";
import { environment } from "src/environments/environment";
import { BaseService } from "../core/base.service";

@Injectable({
  providedIn: "root",
})
export class EmployeesService extends BaseService<Employee> {
  constructor(http: HttpClient) {
    super(http, environment.URL.EMPLOYEE);
  }
}
