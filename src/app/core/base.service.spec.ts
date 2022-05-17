import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BaseService } from './base.service';
import { DATA_MODIFIERS } from './http-data-modifier-services/data-modifier.token';

describe('Service: BaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DATA_MODIFIERS],
      providers: [BaseService],
    });
  });
});
