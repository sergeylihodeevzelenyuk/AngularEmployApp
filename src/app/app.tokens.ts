import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface DataModifier {
  allDataModifier: (data: any) => any;
  itemDataModifier: (data: any, id: string) => any;
}

export const DATA_MODIFIER_TOKEN = new InjectionToken<DataModifier>(
  'dataModifiers'
);

export interface Mode {
  test: boolean;
  prod: boolean;
}

export const MODE_TOKEN = new InjectionToken<Mode>('modeToken', {
  providedIn: 'root',
  factory: () => {
    return {
      test: false,
      prod: true,
    };
  },
});

export const URL_TOKEN = new InjectionToken<URL>('urlToken', {
  providedIn: 'root',
  factory: () => {
    return environment.URL.EMPLOYEE;
  },
});
