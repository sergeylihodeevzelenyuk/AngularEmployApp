import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../auth-model';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {
  singUpForm!: FormGroup;
  hidePass = true;
  hidePassConfirm = true;
  ROUT = environment.PATH;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.singUpForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        this.isEmailExist.bind(this),
      ]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, [
        Validators.required,
        this.isPasswordsMatches.bind(this),
      ]),
    });
  }

  onSubmit(): void {
    const user = new User(
      this.singUpForm.value.email,
      this.singUpForm.value.password
    );

    this.authService.addNewUser(user);
    this.route.navigate([this.ROUT.AUTH.SING_IN]);
    this.singUpForm.reset();
  }

  isEmailExist(control: FormControl): { [s: string]: boolean } | null {
    if (this.authService.hasEmail(control.value)) {
      return { emailExist: true };
    }
    return null;
  }

  isPasswordsMatches(control: FormControl): { [s: string]: boolean } | null {
    const password = this.singUpForm?.value.password;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { noMatches: true };
  }
}
