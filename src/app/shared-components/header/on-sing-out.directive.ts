import { Directive, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Directive({
  selector: "[appOnSingOut]",
})
export class OnSingOutDirective {
  constructor(private authService: AuthService, private router: Router) {}

  @HostListener("click") onSingOut() {
    this.authService.loggOut();
    this.router.navigate(["./"]);
  }
}
