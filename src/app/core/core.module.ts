import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HtttErrorInterceptorService } from './interceptors/httt-error-interceptor.service';
import { HtttUrlEditorInterceptorService } from './interceptors/http-url-editor-interceptor';
import { LocalstorageService } from './localstorage.service';
import { FirebaseDataModifierService } from './http-responce-handle-services/firebase-data-modifier.service';
import { TypicalServerDataModifierService } from './http-responce-handle-services/typical-server-data-modifier.service';
import { DATA_MODIFIERS } from './http-responce-handle-services/data-modifier.token';

@NgModule({
  providers: [
    LocalstorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HtttErrorInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HtttUrlEditorInterceptorService,
      multi: true,
    },
    {
      provide: DATA_MODIFIERS,
      useClass: TypicalServerDataModifierService,
      multi: true,
    },
    {
      provide: DATA_MODIFIERS,
      useClass: FirebaseDataModifierService,
      multi: true,
    },
  ],
  declarations: [],
})
export class CoreModule {}
