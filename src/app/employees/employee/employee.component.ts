import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Employee } from "../employee.model";
import { EmployeesService } from "../employees.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"],
})
export class EmployeeComponent implements OnInit, OnDestroy {
  private employsSub!: Subscription;
  id!: string;
  employee!: Employee;
  isFetching!: boolean;
  isDeleting!: boolean;
  panelOpenState = false;
  notification = { title: "Deleeting in process...", message: "" };
  EMPLOYEES = "/" + environment.PATH.EMPLOYEES.ROOT;
  EDIT = environment.PATH.EMPLOYEES.EDIT_FULL_PASS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employServ: EmployeesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.id = params["id"];
    });

    if (this.employServ.employees.length) {
      this.employee = this.employServ.getEmployeeById(this.id)!;
    } else {
      this.isFetching = true;

      this.employsSub = this.employServ.employeesSub.subscribe((empls) => {
        this.setEmloyee(empls);
        this.isFetching = false;
      });
    }
  }

  onEditClick() {
    this.router.navigate([this.EDIT], {
      queryParams: { id: this.id },
    });
  }

  onDeleteClick() {
    this.isDeleting = true;

    this.employServ.deleteEmployee(this.id).subscribe(() => {
      this.isDeleting = false;
      this.router.navigate([this.EMPLOYEES]);
    });
  }

  ngOnDestroy(): void {
    if (this.employsSub) {
      this.employsSub.unsubscribe();
    }
  }

  private setEmloyee(empls: Employee[]) {
    this.employee = empls.find((item) => item.id === this.id)!;
  }
}
