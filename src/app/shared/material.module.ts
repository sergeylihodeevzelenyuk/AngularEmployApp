import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';

const MatModules = [
  MatButtonModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatInputModule,
  MatIconModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatBadgeModule,
];

@NgModule({
  imports: MatModules,
  exports: MatModules,
  providers: [],
})
export class MaterialModule {}
