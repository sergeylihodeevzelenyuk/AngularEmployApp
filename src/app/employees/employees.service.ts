import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Employee } from './employee.model';
import { BaseService } from '../core/base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService extends BaseService<Employee> {
  constructor(http: HttpClient) {
    super(http, environment.URL.EMPLOYEE, environment.SERVERS_NAME.FIREBASE);
  }
}
