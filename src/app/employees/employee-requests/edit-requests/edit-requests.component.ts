import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { RequestStorageService } from '../requests.storage.service';
import { RequestStatus } from '../requests.enum';
import { Request } from '../requests.model';

@Component({
  selector: 'app-edit-requests',
  templateUrl: './edit-requests.component.html',
  styleUrls: ['./edit-requests.component.scss'],
})
export class EditRequests implements OnInit, OnDestroy {
  requestsForm!: FormGroup;
  fetchedRequestsSub!: Subscription;
  fetchedRequests!: Request[];

  constructor(
    private requestStorageService: RequestStorageService,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.requestsForm = this.fb.group({
      requests: this.fb.array([], Validators.required),
    });

    this.fetchedRequestsSub =
      this.requestStorageService.fetchedRequests.subscribe(
        (requests: Request[]) => (this.fetchedRequests = requests)
      );
  }

  ngOnDestroy(): void {
    this.fetchedRequestsSub.unsubscribe();
  }

  public onFormSubmit(): void {
    const updatedRequests = this.getUpdatedRequests(this.newRequestsViaForm);

    this.requestStorageService.editedRequests.next(updatedRequests);
    this.onModalClose();
  }

  public onModalClose(): void {
    this.location.back();
  }

  public onAddRequestInput(): void {
    this.requestInputs.push(this.newRequestInput());
  }

  public onDeleteRequestInput(i: number) {
    this.requestInputs.removeAt(i);
  }

  public get requestInputs(): FormArray {
    return this.requestsForm.controls['requests'] as FormArray;
  }

  private newRequestInput(): FormGroup {
    return this.fb.group({
      request: ['', Validators.required],
    });
  }

  private get newRequestsViaForm(): Request[] {
    return this.requestsForm.value.requests.map(
      (req: any) => new Request(req.request, RequestStatus.pending)
    );
  }

  private getUpdatedRequests(neqRequests: Request[]): Request[] {
    return [...this.fetchedRequests, ...neqRequests];
  }
}
