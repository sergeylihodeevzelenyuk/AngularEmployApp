import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './auth-model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedSubject = new Subject<boolean>();
  userInfoSubject = new Subject<string>();
  isLogged = false;

  constructor(private localStorage: LocalstorageService) {
    this.configureAuthEnvironment();
  }

  configureAuthEnvironment() {
    this.createLoggStatus();
    this.createInitialUsers();
  }

  createLoggStatus() {
    if (!this.localStorage.hasItem('isLogged')) {
      this.localStorage.createItem('isLogged', '0');
    }
  }

  createInitialUsers() {
    if (!this.localStorage.hasItem('users')) {
      this.localStorage.createItem('users', JSON.stringify([]));
    }
  }

  loggIn(email: string) {
    this.localStorage.updateItem('isLogged', '1');
    this.localStorage.createItem('currentUser', JSON.stringify(email));
    this.userInfoSubject.next(email);
    this.isLoggedSubject.next(true);
  }

  loggOut() {
    this.localStorage.updateItem('isLogged', '0');
    this.localStorage.deleteItem('currentUser');
    this.isLoggedSubject.next(false);
  }

  getAuthStatus() {
    return this.localStorage.getItem('isLogged') === '0' ? false : true;
  }

  getUserInfo() {
    return JSON.parse(this.localStorage.getItem('currentUser'));
  }

  getAllUsers() {
    return JSON.parse(this.localStorage.getItem('users')!);
  }

  getUserByEmail(email: string): User | undefined {
    const users = this.getAllUsers();

    return users.find((user: User) => user.email === email);
  }

  createNewUser(user: User) {
    const users = this.getAllUsers();

    users.push(user);
    this.localStorage.updateItem('users', JSON.stringify(users));
  }

  hasEmail(email: string): boolean {
    const users = this.getAllUsers();

    return users.find((user: User) => user.email === email) === undefined
      ? false
      : true;
  }

  isPasswordConfirmed(email: string, password: string): boolean {
    const user = this.getUserByEmail(email);

    if (user === undefined) {
      return false;
    } else {
      return user.password === password;
    }
  }
}
