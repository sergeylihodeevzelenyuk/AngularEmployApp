import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  errorMessage = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.errorMessage = this.route.snapshot.data['message'];
  }
}
