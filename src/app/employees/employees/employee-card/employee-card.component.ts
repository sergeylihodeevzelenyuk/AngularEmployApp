import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee!: Employee;
  @Output() onGetId = new EventEmitter<string>();
  start!: Date | null;

  constructor() {}

  ngOnInit(): void {
    this.start = this.employee.additional?.startDate
      ? new Date(this.employee.additional?.startDate)
      : null;
  }

  onCardClick(): void {
    this.onGetId.emit(this.employee.id);
  }
}
