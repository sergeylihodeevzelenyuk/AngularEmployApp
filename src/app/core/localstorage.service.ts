import { Injectable } from "@angular/core";

function getLocalStorage(): Storage {
  return localStorage;
}

@Injectable()
export class LocalstorageService {
  private _localStorage;

  constructor() {
    this._localStorage = getLocalStorage();
  }

  hasItem(prop: string): boolean {
    return this._localStorage.hasOwnProperty(prop);
  }

  getItem(prop: string): string {
    return this._localStorage.getItem(prop)!;
  }

  createItem(item: string, value: string) {
    this.setItem(item, value);
  }

  updateItem(item: string, value: string) {
    this.setItem(item, value);
  }

  deleteItem(item: string) {
    this._localStorage.removeItem(item);
  }

  setItem(item: string, value: string) {
    this._localStorage.setItem(item, value);
  }
}
