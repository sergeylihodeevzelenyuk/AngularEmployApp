import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Request } from './requests.model';

@Injectable()
export class RequestStorageService {
  fetchedRequests = new BehaviorSubject<Request[]>([]);
  editedRequests = new Subject<Request[]>();

  constructor() {}
}
