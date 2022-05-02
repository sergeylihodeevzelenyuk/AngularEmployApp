import { Directive, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';

@Directive({
  selector: '[appOnSingOut]',
})
export class OnSingOutDirective {
  constructor(private authService: AuthService) {}

  @HostListener('click') onSingOut() {
    this.authService.loggOut();
  }
}
