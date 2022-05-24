import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { Employee, Requests } from '../employee.model';
import { EmployeesService } from '../employees.service';
import { RequestStatus } from './requests.enum';
import { environment } from 'src/environments/environment';
import { Error } from 'src/app/shared/error-notification/error.model';

@Component({
  selector: 'app-employee-requests',
  templateUrl: './employee-requests.component.html',
  styleUrls: ['./employee-requests.component.scss'],
})
export class EmployeeRequestsComponent implements OnInit {
  @Input() employee!: Employee;
  requestsForm!: FormGroup;
  panelOpenState = false;
  requestsError: Error | null = null;
  requestStatus = RequestStatus;
  ROUTE = environment.PATH;

  constructor(
    private fb: FormBuilder,
    private employeeServise: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestsForm = this.fb.group({
      requests: this.fb.array([], Validators.required),
    });
  }

  public onAddRequest(): void {
    this.requests.push(this.newRequest());
  }

  public onDeleteRequest(i: number) {
    this.requests.removeAt(i);
  }

  public get requests(): FormArray {
    return this.requestsForm.controls['requests'] as FormArray;
  }

  public newRequest(): FormGroup {
    return this.fb.group({
      request: ['', Validators.required],
    });
  }

  public onFormSubmit(): void {
    this.updateEmployeeAndRefreshPage(this.employeeWithRequests);
  }

  public onAcceptRequestClick(i: number): void {
    this.changeRequestStatus(i, RequestStatus.accepted);
  }

  public onDeniedRequestClick(i: number): void {
    this.changeRequestStatus(i, RequestStatus.denied);
  }

  private updateEmployeeAndRefreshPage(updatedEmployee: Employee): void {
    this.employeeServise
      .edit(updatedEmployee, this.employee?.id as string)
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(tap(() => this.ComponentRefresh()))
      .subscribe();
  }

  private ComponentRefresh(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([this.ROUTE.EMPLOYEES.EMPLOYEE_FULL_PASS], {
        queryParams: { id: this.employee?.id },
      })
    );
  }

  private changeRequestStatus(i: number, status: number): void {
    const employee = this.getClonedObj<Employee>(this.employee);
    const request = employee.requests?.find((item, index) => index === i);
    request!.status = status;

    this.updateEmployeeAndRefreshPage(employee);
  }

  private get employeeWithRequests(): Employee {
    const employee = this.getClonedObj<Employee>(this.employee);

    if (!employee.requests) {
      employee.requests = [];
    }
    employee.requests!.push(...this.newRequestsProp);

    return employee;
  }

  private getClonedObj<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
  }

  private get newRequestsProp(): Requests[] {
    return this.requestsForm.value.requests.map(
      (req: any) => new Requests(req.request, RequestStatus.pending)
    );
  }

  public onErrorMsgClose(): void {
    this.requestsError = null;
  }

  private handleError(error: Error): Observable<Error> {
    this.requestsError = error;

    return throwError(() => this.requestsError);
  }
}
