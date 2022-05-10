import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { Employee } from "../employee.model";
import { EmployeesService } from "../employees.service";
import { environment } from "src/environments/environment";
import { Error } from "src/app/shared-components/error-notification/error.model";
import { Mode } from "./mode.enum";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"],
})
export class AddEmployeeComponent implements OnInit {
  editForm!: FormGroup;
  employee!: Employee;
  id!: string;
  mode!: number;
  isFetching!: boolean;
  error: Error | null = null;
  notification!: {
    message: string;
    title: string;
  };
  ROUTE = environment.PATH;
  MODE_ENUM = Mode;
  ERROR_MSG = environment.ERROR_MSG;

  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.setNotification();

    this.route.queryParams.subscribe((params: Params) => {
      if (params["id"]) {
        this.id = params["id"];
        this.mode = this.MODE_ENUM.edit;

        this.employeesService.fetch(this.id).subscribe({
          next: (fetchedEmployee) => {
            this.employee = fetchedEmployee;
            this.isFetching = false;
            this.setEditForm();
            this.setNotification();
          },
          error: (error) => this.errorHandler(error),
        });

        return;
      }

      this.isFetching = false;
      this.mode = this.MODE_ENUM.add;
      this.setEditForm();
      this.setNotification();
    });
  }

  setEditForm() {
    this.editForm = new FormGroup({
      name: new FormControl(null || this.employee?.name, [Validators.required]),
      imgPath: new FormControl(null || this.employee?.imgPath),
      position: new FormControl(null || this.employee?.position, [
        Validators.required,
      ]),
      email: new FormControl(null || this.employee?.email, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(null || this.employee?.phone, [
        Validators.required,
      ]),
    });
  }

  setNotification() {
    if (this.isFetching) {
      this.notification = {
        message: "Fetching employee data",
        title: "",
      };

      return;
    }

    this.notification = {
      message:
        this.mode === this.MODE_ENUM.add
          ? "Adding new employee"
          : "Updating employee",
      title: "",
    };
  }

  onAddFormSubmit() {
    const employee = this.getNewEmployee();

    if (this.mode === this.MODE_ENUM.add) {
      this.isFetching = true;
      this.employeesService.add(employee).subscribe({
        next: () => {
          this.isFetching = false;
          this.router.navigate([this.ROUTE.EMPLOYEES]);
        },
        error: (error) => this.errorHandler(error),
      });

      return;
    }

    this.isFetching = true;
    this.employeesService.edit(employee, this.id).subscribe({
      next: () => {
        this.isFetching = false;
        this.router.navigate([this.ROUTE.EMPLOYEES]);
      },
      error: (error) => this.errorHandler(error),
    });
  }

  onCancellClick() {
    if (this.mode === this.MODE_ENUM.add) {
      this.router.navigate([this.ROUTE.EMPLOYEES]);

      return;
    }

    this.router.navigate([this.ROUTE.EMPLOYEES.EMPLOYEE_FULL_PASS], {
      queryParams: { id: this.id },
    });
  }

  onErrorMsgClose() {
    this.error = null;
  }

  private errorHandler(error: HttpErrorResponse) {
    this.isFetching = false;
    this.error = new Error(this.ERROR_MSG.HTTP_FAIL, error.statusText);
  }

  private getNewEmployee() {
    return new Employee(
      this.editForm.value.name,
      this.editForm.value.position,
      this.editForm.value.email,
      this.editForm.value.phone,
      this.editForm.value.data ? this.editForm.value.data : "",
      this.editForm.value.imgPath ? this.editForm.value.imgPath : ""
    );
  }
}
