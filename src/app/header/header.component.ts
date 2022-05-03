import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged!: boolean;
  userName!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.authService.getAuthStatus();
    this.authService.isLoggedSubject.subscribe(
      (isLogged) => (this.isLogged = isLogged)
    );

    this.userName = this.authService.getCurrentUserInfo();
    this.authService.currentUserSubject.subscribe(
      (userName) => (this.userName = userName)
    );
  }

  onHomeClick() {
    this.router.navigate(["/home"]);
  }

  ngOnDestroy(): void {
    this.authService.isLoggedSubject.unsubscribe();
    this.authService.currentUserSubject.unsubscribe();
  }
}
