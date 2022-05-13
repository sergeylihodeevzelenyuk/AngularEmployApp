import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, take, throwError } from 'rxjs';

import { Employee } from '../employee.model';
import { EmployeesService } from '../employees.service';
import { environment } from 'src/environments/environment';
import { Error } from 'src/app/shared/error-notification/error.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees$!: Observable<Employee[]>;
  error: Error | null = null;
  sortedAlphabetically = true;
  ROUTE = environment.PATH;

  constructor(
    public employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employees$ = this.employeesService.fetchAll().pipe(
      catchError((err) => {
        this.error = err;

        return throwError(() => err);
      })
    );
  }

  onEmployeeClick(id: any): void {
    this.router.navigate([this.ROUTE.EMPLOYEES.EMPLOYEE], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }

  onSortClick(): void {
    this.sortedAlphabetically = !this.sortedAlphabetically;
  }

  onErrorMsgClose(): void {
    this.error = null;
    this.router.navigate([this.ROUTE.HOME]);
  }
}
