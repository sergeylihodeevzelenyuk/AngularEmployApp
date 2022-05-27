import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { Employee } from '../employee.model';
import { EmployeesService } from '../employees.service';
import { environment } from 'src/environments/environment';
import { Error } from 'src/app/shared/error-notification/error.model';
import { RequestsService } from '../employee-requests/requests.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  id!: string;
  employee!: Employee;
  employee$!: Observable<Employee>;
  isDeletingProcess = false;
  isConfirmingDeleting = false;
  error: Error | null = null;
  panelOpenState = false;
  ROUTE = environment.PATH;
  NOTIFICATION = environment.NOTIFICATION.DELETE;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeesService: EmployeesService,
    private requestService: RequestsService
  ) {}

  public ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];

    this.employee$ = this.employeesService
      .fetch(this.id)
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(tap((responce) => (this.employee = responce)));
  }

  public onEditClick(): void {
    this.router.navigate([this.ROUTE.EMPLOYEES.EDIT_FULL_PASS], {
      queryParams: { id: this.id },
    });
  }

  public onDeleteClick(): void {
    this.isConfirmingDeleting = true;
  }

  public onOmitDeleting(): void {
    this.isConfirmingDeleting = false;
  }

  public onConfirmDeleting(): void {
    this.isConfirmingDeleting = false;
    this.isDeletingProcess = true;

    this.employeesService
      .delete(this.id)
      .pipe(
        catchError(this.handleError.bind(this)),
        tap(this.handleAfterDeleteEffect.bind(this))
      )
      .subscribe();

    if (this.employee.requestsId) {
      this.requestService
        .delete(this.employee.requestsId)
        .pipe(catchError(this.handleError.bind(this)))
        .subscribe();
    }
  }

  public onGetRequestIdHandler(id: any): void {
    this.employee.requestsId = id;

    this.employeesService
      .edit(this.employee, this.id)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe();
  }

  private handleAfterDeleteEffect(): void {
    this.isDeletingProcess = false;
    this.router.navigate([this.ROUTE.EMPLOYEES.ROOT]);
  }

  public onErrorMessageClose(): void {
    this.error = null;
    this.router.navigate([this.ROUTE.EMPLOYEES.ROOT]);
  }

  public handleError(error: Error): Observable<never> {
    this.error = error;
    return throwError(() => error);
  }
}
