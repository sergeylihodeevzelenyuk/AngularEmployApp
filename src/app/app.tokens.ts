import { InjectionToken } from '@angular/core';

export interface DataModifier {
  allDataModifier: (data: any) => any;
  itemDataModifier: (data: any, id: string) => any;
}

export const DATA_MODIFIER_TOKEN = new InjectionToken<DataModifier>(
  'dataModifiers'
);

export interface TestMode {
  test: boolean;
  prod: boolean;
}

export const MODE_TOKEN = new InjectionToken<TestMode>('modeToken', {
  providedIn: 'root',
  factory: () => {
    return {
      test: false,
      prod: true,
    };
  },
});