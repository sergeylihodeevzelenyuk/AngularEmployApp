import { Injectable } from '@angular/core';
import { DataModifier } from './data-modifier.interface';

@Injectable()
export class TypicalServerDataModifierService<T> implements DataModifier {
  constructor() {}

  public allDataModifier(data: any): T[] {
    return JSON.parse(data);
  }

  public itemDataModifier(data: any, id: string | number): T {
    return JSON.parse(data);
  }
}
