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
  isDeleting!: boolean;
  isConfirming!: boolean;
  error: Error | null = null;
  panelOpenState = false;
  PATH = environment.PATH;
  ERROR_MSG = environment.ERROR_MSG;
  notification = { title: "Deleeting in process...", message: "" };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employServ: EmployeesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.id = params["id"];
    });
    this.employee = this.employServ.getEmployeeById(this.id)!;
  }

  onEditClick() {
    this.router.navigate([this.PATH.EMPLOYEES.EDIT_FULL_PASS], {
      queryParams: { id: this.id },
    });
  }

  onDeleteClick() {
    this.isConfirming = true;
  }

  onOmitDeleting() {
    this.isConfirming = false;
  }

  onConfirmDeleting() {
    this.isConfirming = false;
    this.isDeleting = true;

    this.employServ.deleteEmployee(this.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.router.navigate([this.PATH.EMPLOYEES.ROOT]);
      },
      error: (error) => {
        this.isDeleting = false;
        this.error = new Error(this.ERROR_MSG.HTTP_FAIL, error.statusText);
      },
    });
  }

  onErrorMsgClose() {
    this.error = null;
  }
}
