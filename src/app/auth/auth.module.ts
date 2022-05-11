import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared-components/shared.module";
import { AuthPageComponent } from "./auth-page/auth-page.component";
import { LoggInComponent } from "./logg-in/logg-in.component";
import { SingUpComponent } from "./sing-up/sing-up.component";
import { environment } from "src/environments/environment";
import { PreventAuthGuard } from "./prevent-auth.guard";

const ROUT = environment.PATH;

@NgModule({
  declarations: [LoggInComponent, SingUpComponent, AuthPageComponent],

  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AuthPageComponent,
        canActivate: [PreventAuthGuard],
        children: [
          { path: ROUT.AUTH.SING_IN, component: LoggInComponent },
          { path: ROUT.AUTH.SING_UP, component: SingUpComponent },
        ],
      },
    ]),
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthModule {}
