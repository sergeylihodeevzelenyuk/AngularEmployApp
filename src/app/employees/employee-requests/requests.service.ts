import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { BaseService } from 'src/app/core/base.service';
import { environment } from '../../../environments/environment';
import { DataModifier, DATA_MODIFIER_TOKEN } from 'src/app/app.tokens';
import { Request } from './requests.model';

@Injectable()
export class RequestsService extends BaseService<Request[]> {
  constructor(
    private _http: HttpClient,
    @Inject(DATA_MODIFIER_TOKEN)
    private _dataModifires: DataModifier
  ) {
    super(_http, _dataModifires, environment.URL.REQUESTS);
  }
}
