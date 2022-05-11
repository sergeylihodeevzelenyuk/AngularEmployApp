import { Injectable } from "@angular/core";

@Injectable()
export class LocalstorageService {
  private _localStorage;

  constructor() {
    this._localStorage = this.localStorage;
  }

  hasItem(prop: string): boolean {
    return this._localStorage.hasOwnProperty(prop);
  }

  getItem(prop: string): string {
    return this._localStorage.getItem(prop)!;
  }

  createItem(item: string, value: string): void {
    this.setItem(item, value);
  }

  updateItem(item: string, value: string): void {
    this.setItem(item, value);
  }

  deleteItem(item: string): void {
    this._localStorage.removeItem(item);
  }

  setItem(item: string, value: string): void {
    this._localStorage.setItem(item, value);
  }

  private get localStorage(): Storage {
    return localStorage;
  }
}
