import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Employee } from "../employee.model";
import { EmployeesService } from "../employees.service";
import { environment } from "src/environments/environment";

enum Mode {
  add = 0,
  edit,
}

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"],
})
export class AddEmployeeComponent implements OnInit {
  addForm!: FormGroup;
  employee!: Employee;
  id!: string;
  mode!: number;
  isFetching = false;
  notification = { message: "Adding new employee", title: "" };

  EMPLOYEE = "/" + environment.PATH.EMPLOYEES.EMPLOYEE_FULL_PASS;
  EMPLOYEES = "/" + environment.PATH.EMPLOYEES.ROOT;

  constructor(
    private employeeServ: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params["id"]) {
        this.id = params["id"];
        this.mode = Mode.edit;
        this.employee = this.employeeServ.getEmployeeById(this.id)!;
        return;
      }

      this.mode = Mode.add;
    });

    this.addForm = new FormGroup({
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

  onAddFormSubmit() {
    const employee = this.getNewEmployee();

    if (this.mode === Mode.add) {
      this.isFetching = true;
      this.employeeServ.addEmployee(employee).subscribe(() => {
        this.isFetching = false;
        this.router.navigate([this.EMPLOYEES]);
      });
      return;
    }

    this.isFetching = true;
    this.employeeServ.editEmployee(employee, this.id).subscribe(() => {
      this.isFetching = false;
      this.router.navigate([this.EMPLOYEES]);
    });
  }

  onCancellClick() {
    if (this.mode === Mode.add) {
      this.router.navigate([this.EMPLOYEES]);
      console.log(this.mode);
      return;
    }
    this.router.navigate([this.EMPLOYEE], { queryParams: { id: this.id } });
  }

  getNewEmployee() {
    return new Employee(
      this.addForm.value.name,
      this.addForm.value.position,
      this.addForm.value.email,
      this.addForm.value.phone,
      this.addForm.value.data ? this.addForm.value.data : "",
      this.addForm.value.imgPath ? this.addForm.value.imgPath : ""
    );
  }
}
