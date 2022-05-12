import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';

@Directive({
  selector: '[appOnSingOut]',
})
export class OnSingOutDirective {
  constructor(private authService: AuthService, private router: Router) {}

  @HostListener('click') onSingOut(): void {
    this.authService.loggOut();
    this.router.navigate([environment.PATH.HOME]);
  }
}
