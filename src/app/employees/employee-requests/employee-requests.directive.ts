import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { RequestStatus } from './requests.enum';

@Directive({
  selector: '[appEmployeeRequests]',
})
export class EmployeeRequestsDirective implements OnInit {
  @Input('appEmployeeRequests') status = RequestStatus.pending;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.status === RequestStatus.accepted) {
      this.renderer.addClass(this.elementRef.nativeElement, 'approved');
    }

    if (this.status === RequestStatus.denied) {
      this.renderer.addClass(this.elementRef.nativeElement, 'denied');
    }
  }
}
