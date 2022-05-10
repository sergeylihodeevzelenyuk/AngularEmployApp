import { NgModule } from "@angular/core";
import { EmployeesService } from "../employees/employees.service";
import { BaseService } from "./base.service";
import { LocalstorageService } from "./localstorage.service";

@NgModule({
  providers: [
    LocalstorageService,
    { provide: BaseService, useClass: EmployeesService },
  ],
})
export class CoreModule {}
