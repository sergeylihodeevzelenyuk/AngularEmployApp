import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { OnSingOutDirective } from './header/on-sing-out.directive';
import { NotificationComponent } from './notification/notification.component';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';
import { SplitOnCapitalPipe } from './split-on-capital.pipe';
import { StringToReadebleDatePipe } from './string-to-readeble-date.pipe';
import { MaterialModule } from './material.module';

const SharedComponents = [
  FooterComponent,
  HeaderComponent,
  NotificationComponent,
  ErrorNotificationComponent,
  OnSingOutDirective,
  SplitOnCapitalPipe,
  StringToReadebleDatePipe,
];

@NgModule({
  declarations: SharedComponents,
  imports: [RouterModule, CommonModule, MaterialModule],
  exports: [...SharedComponents, CommonModule, RouterModule, MaterialModule],
  providers: [],
})
export class SharedModule {}
