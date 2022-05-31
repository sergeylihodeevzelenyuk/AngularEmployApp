import { Component, OnInit } from '@angular/core';
import { mergeMap, Observable, of, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RequestStorageService } from '../requests.storage.service';
import { RequestStatus } from '../requests.enum';
import { Request } from '../requests.model';

@Component({
  selector: 'app-edit-requests-status',
  templateUrl: './edit-request-status.component.html',
  styleUrls: ['./edit-request-status.component.scss'],
})
export class EditRequestsStatus implements OnInit {
  request$!: Observable<Request>;
  requests!: Request[];
  requestIndex!: number;
  requestStatus = RequestStatus;

  constructor(
    private requestStorageService: RequestStorageService,
    private route: ActivatedRoute,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.request$ = this.route.queryParams.pipe(
      mergeMap((queryParams) => {
        const requestIndex = (this.requestIndex = +queryParams['requestIndex']);

        return this.requestStorageService.fetchedRequests.pipe(
          tap((requests: Request[]) => (this.requests = [...requests])),
          mergeMap((requests: Request[]) => of(requests[requestIndex]))
        );
      })
    ) as Observable<Request>;
  }

  public onModalClose(): void {
    this.location.back();
  }

  public onChangeStatus(status: number): void {
    const requests = this.getUpdatedRequestsStatus(this.requestIndex, status);
    if (this.requests[this.requestIndex].status === status) {
      return;
    }

    this.requestStorageService.editedRequests.next(requests);
  }

  private getUpdatedRequestsStatus(i: number, status: number): Request[] {
    const requests = JSON.parse(JSON.stringify(this.requests));
    requests![i].status = status;

    return requests;
  }
}
