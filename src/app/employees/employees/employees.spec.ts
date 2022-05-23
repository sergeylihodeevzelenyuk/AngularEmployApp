import { TestBed } from '@angular/core/testing';

import { EmployeesComponent } from './employees.component';
import { EmployeesService } from '../employees.service';
import { HttpClientModule } from '@angular/common/http';

describe('Component: EmployeesComponent', () => {
  let employees: EmployeesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeesComponent,
        { provide: EmployeesService },
        { provide: HttpClientModule },
      ],
    });

    employees = TestBed.inject(EmployeesComponent);
  });

  xit('should create the EmployeesComponent', () => {
    expect(employees).toBeTruthy();
  });
});
