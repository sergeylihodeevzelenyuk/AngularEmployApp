import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Observable,
  throwError,
  of,
  tap,
  map,
  fromEvent,
  merge,
  switchMap,
  catchError,
  BehaviorSubject,
  mergeMap,
  skip,
} from 'rxjs';

import { RequestsService } from './requests.service';
import { RequestStatus } from './requests.enum';
import { Request } from './requests.model';
import { Error } from 'src/app/shared/error-notification/error.model';

@Component({
  selector: 'app-employee-requests',
  templateUrl: './employee-requests.component.html',
  styleUrls: ['./employee-requests.component.scss'],
})
export class EmployeeRequestsComponent implements OnInit {
  @Input() requestsId: string | undefined;
  @Output() onGetRequestId = new EventEmitter();
  @ViewChild('requestForm', { static: true })
  private requestFormRef!: ElementRef;

  requests$!: Observable<Request[]>;
  requestsFromForm$!: Observable<Request[]>;
  onChangedRequestStatus$ = new BehaviorSubject<Request[]>([]);
  requestsWithUpdatedStatus$!: Observable<Request[]>;

  requestsForm!: FormGroup;
  fetchedRequests!: Request[];
  panelOpenState = false;
  isFetching = false;
  requestsError: Error | null = null;
  requestStatus = RequestStatus;

  constructor(
    private fb: FormBuilder,
    private requestsService: RequestsService
  ) {}

  ngOnInit(): void {
    this.requestsForm = this.fb.group({
      requests: this.fb.array([], Validators.required),
    });

    this.requestsFromForm$ = fromEvent(
      this.requestFormRef.nativeElement,
      'submit'
    ).pipe(
      switchMap(() => {
        if (this.requestsId) {
          return this.getObservableWhithEditedRequests(this.updatedRequests);
        }

        return this.firstCreatedRequest$;
      })
    );

    this.requestsWithUpdatedStatus$ = this.onChangedRequestStatus$.pipe(
      skip(1),
      mergeMap((requests) => this.getObservableWhithEditedRequests(requests))
    );

    this.requests$ = merge(
      this.initialFetchedRequests$,
      this.requestsFromForm$,
      this.requestsWithUpdatedStatus$
    ).pipe(
      tap(() => {
        this.requestsForm.reset();
        this.clearFormArray(this.requests);
        this.isFetching = false;
      }),
      catchError(this.handleError.bind(this))
    ) as Observable<Request[]>;
  }

  private get initialFetchedRequests$(): Observable<Request[]> {
    this.isFetching = true;

    if (this.requestsId) {
      return this.requestsService
        .fetch(this.requestsId as string)
        .pipe(map((res) => this.objectToArray(res) as unknown as Request[]))
        .pipe(tap((res) => (this.fetchedRequests = [...res])));
    }

    return of([]);
  }

  private get firstCreatedRequest$(): Observable<Request[]> {
    this.isFetching = true;

    return this.requestsService
      .add(this.newRequestsFromForm as unknown as Request)
      .pipe(
        tap((res) => {
          this.requestsId = res['name'];
          this.onGetRequestId.emit(res['name']);
        })
      )
      .pipe(
        switchMap((id) =>
          this.requestsService
            .fetch(id['name'])
            .pipe(map((res) => this.objectToArray(res) as unknown as Request[]))
            .pipe(tap((res) => (this.fetchedRequests = [...res])))
        )
      ) as unknown as Observable<Request[]>;
  }

  private getObservableWhithEditedRequests(
    requests: Request[]
  ): Observable<Request[]> {
    this.isFetching = true;

    return this.requestsService
      .edit(requests as unknown as Request, this.requestsId as string)
      .pipe(tap((res) => (this.fetchedRequests = res)));
  }

  public onAcceptRequest($i: number): void {
    this.onChangedRequestStatus$.next(
      this.getUpdatedRequestsStatus($i, RequestStatus.accepted)
    );
  }

  public onDeniedRequest($i: number): void {
    this.onChangedRequestStatus$.next(
      this.getUpdatedRequestsStatus($i, RequestStatus.denied)
    );
  }

  public onAddRequestInput(): void {
    this.requests.push(this.newRequestInput());
  }

  public onDeleteRequestInput(i: number) {
    this.requests.removeAt(i);
  }

  public get requests(): FormArray {
    return this.requestsForm.controls['requests'] as FormArray;
  }

  private newRequestInput(): FormGroup {
    return this.fb.group({
      request: ['', Validators.required],
    });
  }

  private get updatedRequests(): Request[] {
    return this.fetchedRequests
      ? [...this.fetchedRequests, ...this.newRequestsFromForm]
      : this.newRequestsFromForm;
  }

  private getUpdatedRequestsStatus(i: number, status: number): Request[] {
    const requests = JSON.parse(JSON.stringify(this.fetchedRequests));
    requests![i].status = status;

    return requests;
  }

  private get newRequestsFromForm(): Request[] {
    return this.requestsForm.value.requests.map(
      (req: any) => new Request(req.request, RequestStatus.pending)
    );
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

  private clearFormArray(formArray: FormArray): void {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  public onErrorMsgClose(): void {
    this.requestsError = null;
  }

  private handleError(error: Error): Observable<Error> {
    this.requestsError = error;

    return throwError(() => this.requestsError);
  }
}
