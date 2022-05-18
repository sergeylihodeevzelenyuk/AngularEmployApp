import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HtttErrorInterceptorService } from './interceptors/httt-error-interceptor.service';
import { HtttUrlEditorInterceptorService } from './interceptors/http-url-editor-interceptor';
import { LocalstorageService } from './localstorage.service';
import { FirebaseDataModifierService } from './http-data-modifier-services/firebase-data-modifier.service';
import { DATA_MODIFIER_TOKEN, MODE_TOKEN, TestMode } from '../app.tokens';

@NgModule({
  providers: [
    LocalstorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HtttUrlEditorInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HtttErrorInterceptorService,
      multi: true,
    },
    {
      provide: DATA_MODIFIER_TOKEN,
      useFactory: (mode: TestMode) => {
        if (mode.test) {
          // retrurn some moke service to tests
        }

        return new FirebaseDataModifierService();
      },
      deps: [MODE_TOKEN],
    },
  ],
  declarations: [],
})
export class CoreModule {}
