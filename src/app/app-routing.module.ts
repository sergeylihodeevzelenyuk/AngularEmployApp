import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { environment } from "src/environments/environment";

const PATH = environment.PATH;

const appRoutes: Routes = [
  { path: PATH.ROOT, component: HomeComponent },
  { path: PATH.HOME, redirectTo: PATH.ROOT },
  {
    path: PATH.AUTH.ROOT,
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: PATH.EMPLOYEES.ROOT,
    loadChildren: () =>
      import("./employees/employees.module").then((m) => m.EmployeesModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
