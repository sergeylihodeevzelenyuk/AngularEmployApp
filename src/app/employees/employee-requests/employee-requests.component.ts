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
  requestsViaForm$!: Observable<Request[]>;
  onChangRequestStatus$ = new BehaviorSubject<Request[]>([]);
  updatedStatusRequests$!: Observable<Request[]>;

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
    const formEl = this.requestFormRef.nativeElement;

    this.requestsForm = this.fb.group({
      requests: this.fb.array([], Validators.required),
    });

    this.requestsViaForm$ = fromEvent(formEl, 'submit').pipe(
      switchMap(() =>
        this.requestsId
          ? this.getEditedRequestsStream(this.updatedRequests)
          : this.firstCreatedRequest$
      )
    );

    this.updatedStatusRequests$ = this.onChangRequestStatus$.pipe(
      skip(1),
      switchMap((requests) => this.getEditedRequestsStream(requests))
    );

    this.requests$ = merge(
      this.requestsId ? this.getFetchedRequestStream(this.requestsId) : of([]),
      this.requestsViaForm$,
      this.updatedStatusRequests$
    ).pipe(
      tap(() => {
        this.clearFormArray(this.requests);
        this.isFetching = false;
      }),
      catchError(this.handleError.bind(this))
    ) as Observable<Request[]>;
  }

  private get firstCreatedRequest$(): Observable<Request[]> {
    this.isFetching = true;

    return this.requestsService
      .add(this.newRequestsViaForm as unknown as Request)
      .pipe(
        tap((res) => {
          this.requestsId = res['name'];
          this.onGetRequestId.emit(res['name']);
        })
      )
      .pipe(
        mergeMap((id) => this.getFetchedRequestStream(id['name']))
      ) as unknown as Observable<Request[]>;
  }

  private getEditedRequestsStream(requests: Request[]): Observable<Request[]> {
    this.isFetching = true;

    return this.requestsService
      .edit(requests as unknown as Request, this.requestsId as string)
      .pipe(tap((res) => (this.fetchedRequests = [...res])));
  }

  private getFetchedRequestStream(id: string): Observable<Request[]> {
    this.isFetching = true;

    return this.requestsService
      .fetch(id)
      .pipe(map((res) => this.objectToArray(res) as unknown as Request[]))
      .pipe(tap((res) => (this.fetchedRequests = [...res])));
  }

  public onChangeStatus($data: { index: number; status: number }): void {
    const { index, status } = $data;

    this.onChangRequestStatus$.next(
      this.getUpdatedRequestsStatus(index, status)
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
      ? [...this.fetchedRequests, ...this.newRequestsViaForm]
      : this.newRequestsViaForm;
  }

  private getUpdatedRequestsStatus(i: number, status: number): Request[] {
    const requests = JSON.parse(JSON.stringify(this.fetchedRequests));
    requests![i].status = status;

    return requests;
  }

  private get newRequestsViaForm(): Request[] {
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

  private handleError(error: Error): Observable<Error> {
    this.requestsError = error;

    return throwError(() => this.requestsError);
  }
}
