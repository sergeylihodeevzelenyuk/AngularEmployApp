import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees/employees.component';
import { EmployeeCardComponent } from './employees/employee-card/employee-card.component';
import { EmployeeRequestsComponent } from './employee-requests/employee-requests.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';
import { environment } from 'src/environments/environment';
import { ConfirmDeletingComponent } from './employee/confirm-deleting/confirm-deleting.component';
import { SortPipe } from './sort.pipe';
import { EmployeeRequestsDirective } from './employee-requests/employee-requests.directive';
import { RequestsService } from './employee-requests/requests.service';
import { EmployeesService } from './employees.service';
import { EditRequests } from './employee-requests/edit-requests/edit-requests.component';
import { EditRequestsStatus } from './employee-requests/edit-request-status/edit-request-status.component';

const ROUTE = environment.PATH;

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeCardComponent,
    EmployeeRequestsComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    EmployeesPageComponent,
    ConfirmDeletingComponent,
    SortPipe,
    EmployeeRequestsDirective,
    EditRequests,
    EditRequestsStatus,
  ],

  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: EmployeesPageComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: EmployeesComponent,
          },
          {
            path: ROUTE.EMPLOYEES.EMPLOYEE,
            component: EmployeeComponent,
            children: [
              {
                path: ROUTE.EMPLOYEES.REQUEST,
                component: EditRequests,
              },
              {
                path: ROUTE.EMPLOYEES.REQUEST_STAUS,
                component: EditRequestsStatus,
              },
            ],
          },
          {
            path: ROUTE.EMPLOYEES.EDIT,
            component: AddEmployeeComponent,
          },
        ],
      },
    ]),
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [EmployeesService, RequestsService],
})
export class EmployeesModule {}
