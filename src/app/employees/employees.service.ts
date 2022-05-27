import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Employee } from './employee.model';
import { BaseService } from '../core/base.service';
import { environment } from 'src/environments/environment';
import { DATA_MODIFIER_TOKEN } from '../app.tokens';
import { DataModifier } from '../app.tokens';

@Injectable()
export class EmployeesService extends BaseService<Employee> {
  constructor(
    private _http: HttpClient,
    @Inject(DATA_MODIFIER_TOKEN)
    private _dataModifires: DataModifier
  ) {
    super(_http, _dataModifires, environment.URL.EMPLOYEE);
  }
}
