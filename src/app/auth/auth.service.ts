import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { User } from "./auth-model";
import { LocalstorageService } from "../core/localstorage.service";
import { Status, Props } from "./auth.enum";

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

  private configureAuthEnvironment(): void {
    this.createLoggStatus();
    this.createInitialUsers();
  }

  private createLoggStatus(): void {
    if (!this.localStorage.hasItem(Props.isLogged)) {
      this.localStorage.createItem(Props.isLogged, Status.unlogged);
    }
  }

  private createInitialUsers(): void {
    if (!this.localStorage.hasItem(Props.users)) {
      this.localStorage.createItem(Props.users, JSON.stringify([]));
    }
  }

  loggIn(email: string): void {
    this.localStorage.updateItem(Props.isLogged, Status.logged);
    this.localStorage.createItem(Props.currentUser, JSON.stringify(email));
    this.isLoggedSubject.next(true);
    this.currentUserSubject.next(email);
  }

  loggOut(): void {
    this.localStorage.updateItem(Props.isLogged, Status.unlogged);
    this.localStorage.deleteItem(Props.currentUser);
    this.isLoggedSubject.next(false);
  }

  get authStatus(): boolean {
    return this.localStorage.getItem(Props.isLogged) === Status.logged
      ? true
      : false;
  }

  getCurrentUserInfo(): string {
    return JSON.parse(this.localStorage.getItem(Props.currentUser));
  }

  private getAllUsers(): User[] {
    return JSON.parse(this.localStorage.getItem(Props.users)!);
  }

  getUserByEmail(email: string): User | undefined {
    const users = this.getAllUsers();

    return users.find((user: User) => user.email === email);
  }

  addNewUser(user: User): void {
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
