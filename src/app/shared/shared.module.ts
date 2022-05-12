import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { OnSingOutDirective } from './header/on-sing-out.directive';
import { NotificationComponent } from './notification/notification.component';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';
import { SplitOnCapitalPipe } from './split-on-capital.pipe';
import { StringToReadebleDatePipe } from './string-to-readeble-date.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotificationComponent,
    OnSingOutDirective,
    ErrorNotificationComponent,
    SplitOnCapitalPipe,
    StringToReadebleDatePipe,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NotificationComponent,
    ErrorNotificationComponent,
    OnSingOutDirective,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SplitOnCapitalPipe,
    StringToReadebleDatePipe,
  ],
  providers: [],
})
export class SharedModule {}
