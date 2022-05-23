import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Employee } from '../employees/employee.model';
import { MockBaseService } from './mock-base.service';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';

describe('Component: MockBaseService', () => {
  let service: BaseService<Employee>;
  let httpMock: HttpTestingController;
  const { mockedEmployeesData } = environment;
  const { URL } = environment;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: BaseService, useClass: MockBaseService }],
    });

    service = TestBed.inject(BaseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the instance of the BaseService', () => {
    expect(service).toBeTruthy();
  });

  it('should return observable with Employees[] when method fetchAll called', () => {
    service.fetchAll().subscribe((employees) => {
      expect(employees.length).toBe(mockedEmployeesData.modyfied.length);
      expect(employees).toEqual(mockedEmployeesData.modyfied);
    });

    const request = httpMock.expectOne(URL.EMPLOYEE.href);

    expect(request.request.method).toBe('GET');
    request.flush(mockedEmployeesData.modyfied);
  });

  it('should return observable with Employees when method fetch called', () => {
    const id = mockedEmployeesData.modyfied[0].id;

    service.fetch(id).subscribe((employee) => {
      expect(employee).toEqual(mockedEmployeesData.modyfied[0]);
    });

    const request = httpMock.expectOne(`${URL.EMPLOYEE.href}/${id}`);

    expect(request.request.method).toBe('GET');
    request.flush(mockedEmployeesData.modyfied[0]);
  });

  it('should return observable with updated Employees when method edit called', () => {
    const id = mockedEmployeesData.modyfied[0].id;
    const updatedEmployee = {
      ...mockedEmployeesData.modyfied[0],
      name: 'NewName',
    };

    service.edit(updatedEmployee, id).subscribe((employee) => {
      expect(employee).toEqual(updatedEmployee);
      expect(employee.name).toBe('NewName');
    });

    const request = httpMock.expectOne(`${URL.EMPLOYEE.href}/${id}`);

    expect(request.request.method).toBe('PUT');
    request.flush(updatedEmployee);
  });

  it('should return observable with null when method delit called', () => {
    const id = mockedEmployeesData.modyfied[0].id;

    service.delete(id).subscribe((response) => {
      expect(response).toEqual(null);
    });

    const request = httpMock.expectOne(`${URL.EMPLOYEE.href}/${id}`);

    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
