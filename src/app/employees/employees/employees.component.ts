import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Employee } from "../employee.model";
import { EmployeesService } from "../employees.service";
import { environment } from "src/environments/environment";
import { Error } from "src/app/shared-components/error-notification/error.model";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  isFetching = false;
  sortedAlphabetically = true;
  error: Error | null = null;
  ROUT = environment.PATH;
  ERROR_MSG = environment.ERROR_MSG;

  constructor(
    private employeesServ: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isFetching = true;

    this.employeesServ.fetchAll().subscribe({
      next: (employees) => {
        this.employees = [...employees];
        this.isFetching = false;
      },
      error: (error) => {
        this.isFetching = false;
        this.error = new Error(this.ERROR_MSG.HTTP_FAIL, error.statusText);
      },
    });
  }

  onEmployeeClick(id: any) {
    this.router.navigate([this.ROUT.EMPLOYEES.EMPLOYEE], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }

  onSortClick() {
    this.sortedAlphabetically = !this.sortedAlphabetically;
  }

  onErrorMsgClose() {
    this.error = null;
  }
}
