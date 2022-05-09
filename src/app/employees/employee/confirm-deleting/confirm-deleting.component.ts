import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-confirm-deleting",
  templateUrl: "./confirm-deleting.component.html",
  styleUrls: ["./confirm-deleting.component.scss"],
})
export class ConfirmDeletingComponent {
  @Output() onCancell = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  onCloseClick() {
    this.onCancell.emit();
  }

  onConfirmClick() {
    this.onConfirm.emit();
  }
}
