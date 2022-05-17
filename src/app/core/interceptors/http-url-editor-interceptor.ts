import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class HtttUrlEditorInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes(environment.SERVERS_NAME.FIREBASE)) {
      const secureReq = request.clone({
        url: `${request.url}.json`,
      });

      return next.handle(secureReq);
    }

    return next.handle(request);
  }
}
