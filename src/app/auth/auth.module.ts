import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared-components/shared.module";
import { LoggInComponent } from "./logg-in/logg-in.component";
import { SingUpComponent } from "./sing-up/sing-up.component";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [LoggInComponent, SingUpComponent],

  imports: [
    RouterModule.forChild([
      { path: environment.PATH.AUTH.SING_IN, component: LoggInComponent },
      { path: environment.PATH.AUTH.SING_UP, component: SingUpComponent },
    ]),
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthModule {}
