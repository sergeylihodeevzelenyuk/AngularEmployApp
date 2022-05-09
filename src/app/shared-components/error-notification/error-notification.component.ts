import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Error } from "src/app/shared-components/error-notification/error.model";

@Component({
  selector: "app-error-notification",
  templateUrl: "./error-notification.component.html",
  styleUrls: ["./error-notification.component.scss"],
})
export class ErrorNotificationComponent {
  @Input() error!: Error;
  @Output() onClose = new EventEmitter<void>();

  onCloseBtnClick() {
    this.onClose.emit();
  }
}
