import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Employee } from './employee.model';
import { BaseService } from '../core/base.service';
import { environment } from 'src/environments/environment';
import { ServersNames } from '../core/http-data-modifier-services/servers.enum';
import { DATA_MODIFIERS } from '../core/http-data-modifier-services/data-modifier.token';
import { DataModifier } from '../core/http-data-modifier-services/data-modifier.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService extends BaseService<Employee> {
  constructor(
    private _http: HttpClient,
    @Inject(DATA_MODIFIERS)
    private _dataModifires: ReadonlyArray<DataModifier>
  ) {
    super(
      _http,
      _dataModifires,
      environment.URL.EMPLOYEE,
      ServersNames.firebase
    );
  }
}
