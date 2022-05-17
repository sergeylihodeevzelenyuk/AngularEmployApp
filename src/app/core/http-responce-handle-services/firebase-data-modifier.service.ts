import { Injectable } from '@angular/core';
import { DataModifier } from './data-modifier.interface';

@Injectable()
export class FirebaseDataModifierService<T> implements DataModifier {
  constructor() {}

  public allDataModifier(data: any): T[] {
    const modifiedItems: T[] = [];

    for (let key in data) {
      modifiedItems.push({ ...data[key], id: key });
    }

    return modifiedItems;
  }

  public itemDataModifier(fetchedItem: any, id: string): T {
    return { ...fetchedItem, id };
  }
}
