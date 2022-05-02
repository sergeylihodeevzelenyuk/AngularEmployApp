import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-logg-in",
  templateUrl: "./logg-in.component.html",
  styleUrls: ["./logg-in.component.scss"],
})
export class LoggInComponent implements OnInit {
  loggInForm!: FormGroup;
  hide = true;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.loggInForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        this.isEmailExist.bind(this),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.isPasswordConfirmed.bind(this),
      ]),
    });
  }

  onSubmit() {
    const email = this.loggInForm?.get("email")!.value;

    this.authService.loggIn(email);
    this.route.navigate(["/"]);
    this.loggInForm.reset();
  }

  isEmailExist(control: FormControl): { [s: string]: boolean } | null {
    if (this.authService.hasEmail(control.value)) {
      return null;
    }
    return { emailExist: false };
  }

  isPasswordConfirmed(control: FormControl): { [s: string]: boolean } | null {
    const email = this.loggInForm?.value.email;
    const password = control.value;

    if (this.authService.isPasswordConfirmed(email, password)) {
      return null;
    } else {
      return { passwordConfirmed: false };
    }
  }
}
