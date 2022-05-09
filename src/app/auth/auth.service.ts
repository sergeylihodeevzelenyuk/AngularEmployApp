import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { User } from "./auth-model";
import { LocalstorageService } from "../shared-services/localstorage.service";

enum Status {
  unlogged = "0",
  logged = "1",
}

enum Props {
  isLogged = "isLogged",
  user = "user",
  users = "users",
  currentUser = "currentUser",
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedSubject = new BehaviorSubject<boolean>(this.authStatus);
  currentUserSubject = new Subject<string>();
  isLogged = false;

  constructor(private localStorage: LocalstorageService) {
    this.configureAuthEnvironment();
  }

  configureAuthEnvironment() {
    this.createLoggStatus();
    this.createInitialUsers();
  }

  createLoggStatus() {
    if (!this.localStorage.hasItem(Props.isLogged)) {
      this.localStorage.createItem(Props.isLogged, Status.unlogged);
    }
  }

  createInitialUsers() {
    if (!this.localStorage.hasItem(Props.users)) {
      this.localStorage.createItem(Props.users, JSON.stringify([]));
    }
  }

  loggIn(email: string) {
    this.localStorage.updateItem(Props.isLogged, Status.logged);
    this.localStorage.createItem(Props.currentUser, JSON.stringify(email));
    this.isLoggedSubject.next(true);
    this.currentUserSubject.next(email);
  }

  loggOut() {
    this.localStorage.updateItem(Props.isLogged, Status.unlogged);
    this.localStorage.deleteItem(Props.currentUser);
    this.isLoggedSubject.next(false);
  }

  get authStatus() {
    return this.localStorage.getItem(Props.isLogged) === Status.logged
      ? true
      : false;
  }

  getCurrentUserInfo() {
    return JSON.parse(this.localStorage.getItem(Props.currentUser));
  }

  getAllUsers() {
    return JSON.parse(this.localStorage.getItem(Props.users)!);
  }

  getUserByEmail(email: string): User | undefined {
    const users = this.getAllUsers();

    return users.find((user: User) => user.email === email);
  }

  addNewUser(user: User) {
    const users = this.getAllUsers();

    users.push(user);
    this.localStorage.updateItem(Props.users, JSON.stringify(users));
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
