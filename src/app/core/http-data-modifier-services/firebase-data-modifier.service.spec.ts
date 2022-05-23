import { TestBed } from '@angular/core/testing';

import { Employee } from 'src/app/employees/employee.model';
import { FirebaseDataModifierService } from './firebase-data-modifier.service';
import { environment } from 'src/environments/environment';

describe('Service: FirebaseDataModifierService', () => {
  let service: FirebaseDataModifierService<Employee>;
  let { mockedEmployeesData } = environment;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseDataModifierService],
    });

    service = TestBed.inject(FirebaseDataModifierService);
  });

  it('should create the instance of FirebaseDataModifierService', () => {
    expect(service).toBeTruthy();
  });

  it('should return allData as expected itemData view', () => {
    expect(service.allDataModifier(mockedEmployeesData.fetched)).toEqual(
      mockedEmployeesData.modyfied
    );
  });

  it('should return itemData as expected itemData view', () => {
    expect(
      service.itemDataModifier(
        mockedEmployeesData.fetched['-N1FGEHiZZ8REoVxGB_L'],
        '-N1FGEHiZZ8REoVxGB_L'
      )
    ).toEqual(mockedEmployeesData.modyfied[3]);
  });
});
