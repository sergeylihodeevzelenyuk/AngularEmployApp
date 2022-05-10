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
  isFetched!: boolean;
  isDeleting!: boolean;
  isConfirmingDeleting!: boolean;
  error: Error | null = null;
  panelOpenState = false;
  ROUTE = environment.PATH;
  ERROR_MSG = environment.ERROR_MSG;
  notification = { message: "Deleeting in process...", title: "" };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.isFetched = true;
    this.route.queryParams.subscribe((params: Params) => {
      this.id = params["id"];
    });

    this.employeesService.fetch(this.id).subscribe({
      next: (fetchedEmployee) => {
        this.employee = fetchedEmployee;
        this.isFetched = false;
      },
      error: (error) => {
        this.isFetched = false;
        this.error = new Error(this.ERROR_MSG.HTTP_FAIL, error.statusText);
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
    this.isDeleting = true;

    this.employeesService.delete(this.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.router.navigate([this.ROUTE.EMPLOYEES.ROOT]);
      },
      error: (error) => {
        this.isDeleting = false;
        this.error = new Error(this.ERROR_MSG.HTTP_FAIL, error.statusText);
      },
    });
  }

  onErrorMessageClose() {
    this.error = null;
  }
}
