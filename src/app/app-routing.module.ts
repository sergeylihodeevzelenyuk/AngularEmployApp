import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { environment } from "src/environments/environment";

const appRoutes: Routes = [
  { path: environment.PATH.ROOT, component: HomeComponent },
  { path: environment.PATH.HOME, redirectTo: environment.PATH.ROOT },
  {
    path: environment.PATH.EMPLOYEES.ROOT,
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
