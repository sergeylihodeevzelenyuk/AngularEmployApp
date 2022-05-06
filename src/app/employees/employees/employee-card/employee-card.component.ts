import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Employee } from "../../employee.model";

@Component({
  selector: "app-employee-card",
  templateUrl: "./employee-card.component.html",
  styleUrls: ["./employee-card.component.scss"],
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee!: Employee;
  @Output() onGetId = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onCardClick() {
    this.onGetId.emit(this.employee.id);
  }
}
