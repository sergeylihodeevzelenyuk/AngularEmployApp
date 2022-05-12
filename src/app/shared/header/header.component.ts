import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged!: boolean;
  userName!: string;
  isLoggedSub!: Subscription;
  userNameSub!: Subscription;

  HOME = `/${environment.PATH.ROOT}`;
  EMPLOYEES = `/${environment.PATH.EMPLOYEES.ROOT}`;
  EDIT = `/${environment.PATH.EMPLOYEES.EDIT_FULL_PASS}`;
  SING_IN = `/${environment.PATH.AUTH.SING_IN}`;
  SING_UP = `/${environment.PATH.AUTH.SING_UP}`;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.authService.authStatus;
    this.isLoggedSub = this.authService.isLoggedSubject.subscribe(
      (isLogged) => (this.isLogged = isLogged)
    );

    this.userName = this.authService.getCurrentUserInfo();
    this.userNameSub = this.authService.currentUserSubject.subscribe(
      (userName) => (this.userName = userName)
    );
  }

  onHomeClick(): void {
    this.router.navigate([this.HOME]);
  }

  ngOnDestroy(): void {
    this.isLoggedSub.unsubscribe();
    this.userNameSub.unsubscribe();
  }
}
