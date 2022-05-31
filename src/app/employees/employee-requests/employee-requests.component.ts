import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Observable,
  throwError,
  of,
  tap,
  map,
  merge,
  catchError,
  mergeMap,
} from 'rxjs';
import { Router } from '@angular/router';

import { RequestStorageService } from './requests.storage.service';
import { RequestsService } from './requests.service';
import { RequestStatus } from './requests.enum';
import { Request } from './requests.model';
import { Error } from 'src/app/shared/error-notification/error.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-requests',
  templateUrl: './employee-requests.component.html',
  styleUrls: ['./employee-requests.component.scss'],
  providers: [RequestStorageService],
})
export class EmployeeRequestsComponent implements OnInit {
  @Input() requestsId: string | undefined;
  @Output() onGetRequestId = new EventEmitter();

  requests$!: Observable<Request[]>;
  editedRequests$!: Observable<Request[]>;
  updatedStatusRequests$!: Observable<Request[]>;

  employeeId!: string;
  fetchedRequests!: Request[];
  panelOpenState = false;
  isFetching = false;
  requestsError: Error | null = null;
  requestStatus = RequestStatus;
  REQUEST_ROUTE = environment.PATH.EMPLOYEES.REQUEST_FULL_ROUTE;
  REQUEST_STAUS_ROUTE = environment.PATH.EMPLOYEES.REQUEST_STAUS_FULL_ROUTE;

  constructor(
    private requestsService: RequestsService,
    private requestsStorageService: RequestStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editedRequests$ = this.requestsStorageService.editedRequests.pipe(
      mergeMap((requests: Request[]) => {
        return this.requestsId
          ? this.getEditedRequestsStream(requests)
          : this.getfirstCreatedRequestStream(requests);
      })
    );

    this.requests$ = merge(
      this.requestsId ? this.getFetchedRequestStream(this.requestsId) : of([]),
      this.editedRequests$
    ).pipe(
      tap(() => {
        this.isFetching = false;
      }),
      catchError(this.handleError.bind(this))
    ) as Observable<Request[]>;
  }

  private getfirstCreatedRequestStream(
    requests: Request[]
  ): Observable<Request[]> {
    this.isFetching = true;

    return this.requestsService
      .add(requests)
      .pipe(
        tap((id) => {
          this.requestsId = id['name'];
          this.onGetRequestId.emit(id['name']);
        })
      )
      .pipe(mergeMap((id) => this.getFetchedRequestStream(id['name'])));
  }

  private getEditedRequestsStream(requests: Request[]): Observable<Request[]> {
    this.isFetching = true;

    return this.requestsService.edit(requests, this.requestsId!).pipe(
      tap((res) => this.requestsStorageService.fetchedRequests.next([...res])),
      tap((res: Request[]) => (this.fetchedRequests = [...res]))
    );
  }

  private getFetchedRequestStream(id: string): Observable<Request[]> {
    this.isFetching = true;

    return this.requestsService
      .fetch(id)
      .pipe(map((res) => this.objectToArray(res)))
      .pipe(
        tap((res) =>
          this.requestsStorageService.fetchedRequests.next([...res])
        ),
        tap((res) => (this.fetchedRequests = [...res]))
      );
  }

  public onEditRequestClick(): void {
    this.router.navigate([this.REQUEST_ROUTE]);
  }

  public onEditRequestStatusClick(i: number): void {
    this.router.navigate([this.REQUEST_STAUS_ROUTE], {
      queryParams: {
        requestIndex: i,
      },
    });
  }

  private objectToArray(object: { [key: string]: any }) {
    const result: any[] = [];

    for (let key in object) {
      if (key !== 'id') {
        result.push(object[key]);
      }
    }

    return result;
  }

  private handleError(error: Error): Observable<Error> {
    this.requestsError = error;

    return throwError(() => this.requestsError);
  }
}
