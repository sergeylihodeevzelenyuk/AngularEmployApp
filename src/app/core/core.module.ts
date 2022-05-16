import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HtttErrorInterceptorService } from './httt-error-interceptor.service';
import { LocalstorageService } from './localstorage.service';

@NgModule({
  providers: [
    LocalstorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HtttErrorInterceptorService,
      multi: true,
    },
  ],
  declarations: [],
})
export class CoreModule {}
