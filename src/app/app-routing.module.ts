import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';

const ROUT = environment.PATH;

const appRoutes: Routes = [
  { path: ROUT.ROOT, component: HomeComponent },
  { path: ROUT.HOME, redirectTo: ROUT.ROOT },
  {
    path: ROUT.AUTH.ROOT,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: ROUT.EMPLOYEES.ROOT,
    loadChildren: () =>
      import('./employees/employees.module').then((m) => m.EmployeesModule),
  },
  { path: '**', redirectTo: ROUT.ROOT },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
