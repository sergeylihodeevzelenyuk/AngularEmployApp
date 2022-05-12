import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  employees: Employee[] = [];
  isFetching = false;
  sortedAlphabetically = true;
  error: Error | null = null;
  ROUT = environment.PATH;

  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isFetching = true;

    this.employeesService.fetchAll().subscribe({
      next: (fetchetEmployees) => {
        this.employees = [...fetchetEmployees];
        this.isFetching = false;
      },
      error: (error) => {
        this.isFetching = false;
        this.error = error;
      },
    });
  }

  onEmployeeClick(id: any): void {
    this.router.navigate([this.ROUT.EMPLOYEES.EMPLOYEE], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }

  onSortClick(): void {
    this.sortedAlphabetically = !this.sortedAlphabetically;
  }

  onErrorMsgClose(): void {
    this.error = null;
    this.router.navigate([this.ROUT.HOME]);
  }

  employeeTrackBy(index: number, employee: Employee): string {
    return employee.id!;
  }
}
