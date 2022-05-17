import { Injectable } from '@angular/core';
import { DataModifier } from './data-modifier.interface';

@Injectable()
export class TypicalServerDataModifierService<T> implements DataModifier {
  constructor() {}

  public allDataModifier(data: any): T[] {
    return data;
  }

  public itemDataModifier(fetchedItem: any, id: string): T {
    return fetchedItem;
  }
}
