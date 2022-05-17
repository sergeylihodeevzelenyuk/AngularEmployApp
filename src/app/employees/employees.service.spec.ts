import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DATA_MODIFIERS } from '../core/http-data-modifier-services/data-modifier.token';
import { EmployeesService } from './employees.service';
import { BaseService } from '../core/base.service';

describe('EmployeesService', () => {
  let employeesServ: EmployeesService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DATA_MODIFIERS],
      providers: [EmployeesService, BaseService],
    });
    employeesServ = TestBed.inject(EmployeesService);
    httpController = TestBed.inject(HttpTestingController);
  });
});
