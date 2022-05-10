import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { EmployeesComponent } from "./employees/employees.component";
import { EmployeeCardComponent } from "./employees/employee-card/employee-card.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { EmployeeComponent } from "./employee/employee.component";
import { EmployeesPageComponent } from "./employees-page/employees-page.component";
import { SharedModule } from "../shared-components/shared.module";
import { EmployeesResolverService } from "./employees-resolver.service";
import { AuthGuard } from "../auth/auth.guard";
import { environment } from "src/environments/environment";
import { ConfirmDeletingComponent } from "./employee/confirm-deleting/confirm-deleting.component";
import { SortPipe } from './sort.pipe';

const PATH = environment.PATH;

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeCardComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    EmployeesPageComponent,
    ConfirmDeletingComponent,
    SortPipe,
  ],

  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: EmployeesPageComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: "",
            component: EmployeesComponent,
          },
          {
            path: PATH.EMPLOYEES.EMPLOYEE,
            component: EmployeeComponent,
            resolve: [EmployeesResolverService],
          },
          {
            path: PATH.EMPLOYEES.EDIT,
            component: AddEmployeeComponent,
            resolve: [EmployeesResolverService],
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
