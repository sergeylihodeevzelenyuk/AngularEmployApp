import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

import { Employee } from '../employee.model';
import { EmployeesService } from '../employees.service';
import { environment } from 'src/environments/environment';
import { Error } from 'src/app/shared/error-notification/error.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  id!: string;
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
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];

    this.employee$ = this.employeesService
      .fetch(this.id)
      .pipe(catchError(this.handleError.bind(this)));
  }

  onEditClick(): void {
    this.router.navigate([this.ROUTE.EMPLOYEES.EDIT_FULL_PASS], {
      queryParams: { id: this.id },
    });
  }

  onDeleteClick(): void {
    this.isConfirmingDeleting = true;
  }

  onOmitDeleting(): void {
    this.isConfirmingDeleting = false;
  }

  onConfirmDeleting(): void {
    this.isConfirmingDeleting = false;
    this.isDeletingProcess = true;

    this.employeesService.delete(this.id).subscribe({
      next: (response) => {
        this.isDeletingProcess = false;
        this.router.navigate([this.ROUTE.EMPLOYEES.ROOT]);
      },
      error: (error) => {
        this.isDeletingProcess = false;
        this.error = error;
      },
    });
  }

  onErrorMessageClose(): void {
    this.error = null;
    this.router.navigate([this.ROUTE.EMPLOYEES.ROOT]);
  }

  private handleError(error: Error): Observable<never> {
    this.error = error;
    return throwError(() => error);
  }
}
