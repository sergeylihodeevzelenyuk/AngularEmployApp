import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-error-notification",
  templateUrl: "./error-notification.component.html",
  styleUrls: ["./error-notification.component.scss"],
})
export class ErrorNotificationComponent implements OnInit {
  @Input() title!: string;
  @Input() message!: string;

  constructor() {}

  ngOnInit(): void {}
}
