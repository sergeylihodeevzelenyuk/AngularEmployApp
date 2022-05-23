import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { LocalstorageService } from 'src/app/core/localstorage.service';

describe('Component: AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: LocalstorageService }],
    });

    service = TestBed.inject(AuthService);
  });

  xit('should create the instance of the AuthService', () => {
    expect(service).toBeTruthy();
  });
});
