import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Employee } from "../employee.model";
import { EmployeesService } from "../employees.service";
import { environment } from "src/environments/environment";
import { Error } from "src/app/shared-components/error-notification/error.model";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"],
})
export class EmployeeComponent implements OnInit {
  id!: string;
  employee!: Employee;
  isFetching = true;
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
    this.id = this.route.snapshot.queryParams["id"];

    this.employeesService.fetch(this.id).subscribe({
      next: (fetchedEmployee) => {
        this.employee = fetchedEmployee;
        this.isFetching = false;
      },
      error: (error) => {
        this.isFetching = false;
        this.error = error;
      },
    });
  }

  onEditClick() {
    this.router.navigate([this.ROUTE.EMPLOYEES.EDIT_FULL_PASS], {
      queryParams: { id: this.id },
    });
  }

  onDeleteClick() {
    this.isConfirmingDeleting = true;
  }

  onOmitDeleting() {
    this.isConfirmingDeleting = false;
  }

  onConfirmDeleting() {
    this.isConfirmingDeleting = false;
    this.isDeletingProcess = true;

    this.employeesService.delete(this.id).subscribe({
      next: () => {
        this.isDeletingProcess = false;
        this.router.navigate([this.ROUTE.EMPLOYEES.ROOT]);
      },
      error: (error) => {
        this.isDeletingProcess = false;
        this.error = error;
      },
    });
  }

  onErrorMessageClose() {
    this.error = null;
    this.router.navigate([this.ROUTE.EMPLOYEES.ROOT]);
  }
}
