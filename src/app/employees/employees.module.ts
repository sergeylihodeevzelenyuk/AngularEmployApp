import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { EmployeesComponent } from "./employees/employees.component";
import { EmployeeCardComponent } from "./employees/employee-card/employee-card.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { EmployeeComponent } from "./employee/employee.component";
import { environment } from "src/environments/environment";
import { SharedModule } from "../shared-components/shared.module";
import { EmployeesPageComponent } from "./employees-page/employees-page.component";
import { EmployeesResolverService } from "./employees-resolver.service";

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeCardComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    EmployeesPageComponent,
  ],

  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: EmployeesPageComponent,
        children: [
          {
            path: "",
            component: EmployeesComponent,
          },
          {
            path: environment.PATH.EMPLOYEES.EMPLOYEE,
            component: EmployeeComponent,
            resolve: [EmployeesResolverService],
          },
          {
            path: environment.PATH.EMPLOYEES.EDIT,
            component: AddEmployeeComponent,
          },
        ],
      },
    ]),
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
})
export class EmployeesModule {}
