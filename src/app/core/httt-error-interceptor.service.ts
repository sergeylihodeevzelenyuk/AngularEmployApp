import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { Error } from '../shared/error-notification/error.model';
import { environment } from '../../environments/environment';

@Injectable()
export class HtttErrorInterceptorService implements HttpInterceptor {
  ERROR_MSG = environment.ERROR_MSG;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg: Error;

        if (error.error instanceof ErrorEvent) {
          errorMsg = new Error(this.ERROR_MSG.HTTP_FAIL, error.error.message);
        } else {
          errorMsg = new Error(
            `${this.ERROR_MSG.TITLE}${error.status}`,
            error.message
          );
        }

        return throwError(errorMsg);
      })
    );
  }
}
