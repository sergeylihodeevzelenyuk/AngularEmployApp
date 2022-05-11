import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { EmployeesService } from "../employees/employees.service";
import { BaseService } from "./base.service";
import { HtttErrorInterceptorService } from "./httt-error-interceptor.service";
import { LocalstorageService } from "./localstorage.service";

@NgModule({
  providers: [
    LocalstorageService,
    { provide: BaseService, useClass: EmployeesService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HtttErrorInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
