import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Employee } from "../employee.model";
import { EmployeesService } from "../employees.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  private contentSubscr!: Subscription;
  private isFatchingSubscr!: Subscription;
  private errorSubscr!: Subscription;
  EMPLOYEE = environment.PATH.EMPLOYEES.EMPLOYEE;
  EDIT = environment.PATH.EMPLOYEES.EDIT;

  employees: Employee[] = [];
  isFetching!: boolean;

  constructor(
    private employeesServ: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeesServ.fetchEmployees();
    this.isFetching = true;

    this.isFatchingSubscr = this.employeesServ.isFetchingSub.subscribe(
      (isFatching) => (this.isFetching = isFatching)
    );
    this.contentSubscr = this.employeesServ.employeesSub.subscribe(
      (employees) => (this.employees = employees)
    );
  }

  ngOnDestroy(): void {
    this.contentSubscr.unsubscribe();
    this.isFatchingSubscr.unsubscribe();
  }

  onEmployeeClick(id: any) {
    this.router.navigate([this.EMPLOYEE], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }
}
