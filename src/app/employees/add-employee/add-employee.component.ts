import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee, Additional } from '../employee.model';
import { EmployeesService } from '../employees.service';
import { environment } from 'src/environments/environment';
import { Error } from 'src/app/shared/error-notification/error.model';
import { Mode } from './mode.enum';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  editForm!: FormGroup;
  employee!: Employee;
  id!: string;
  mode!: number;
  isFetching = false;
  error: Error | null = null;
  notification!: string;
  NOTIFICATION = environment.NOTIFICATION;
  ROUTE = environment.PATH;

  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.idFromQueryParams) {
      this.isFetching = true;
      this.id = this.idFromQueryParams;
      this.mode = Mode.edit;
      this.setNotification();

      this.employeesService.fetch(this.id).subscribe({
        next: (fetchedEmployee) => {
          this.employee = fetchedEmployee;
          this.isFetching = false;
          this.setEditForm();
          this.setNotification();
        },
        error: (error) => {
          this.isFetching = false;
          this.error = error;
        },
      });

      return;
    }

    this.mode = Mode.add;
    this.setEditForm();
    this.setNotification();
  }

  setEditForm(): void {
    this.editForm = new FormGroup({
      name: new FormControl(null || this.employee?.name, [Validators.required]),
      imgPath: new FormControl(null || this.employee?.imgPath),
      position: new FormControl(null || this.employee?.position, [
        Validators.required,
      ]),
      email: new FormControl(null || this.employee?.email, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(null || this.employee?.phone, [
        Validators.required,
      ]),
      additional: new FormGroup({
        team: new FormControl(null || this.employee?.additional?.team),
        birthday: new FormControl(null || this.employee?.additional?.birthday),
        startDate: new FormControl(
          null || this.employee?.additional?.startDate
        ),
        family: new FormControl(null || this.employee?.additional?.family),
        hobbies: new FormControl(null || this.employee?.additional?.hobbies),
      }),
    });
  }

  setNotification(): void {
    if (this.isFetching) {
      this.notification = this.NOTIFICATION.FETCH;

      return;
    }

    this.notification =
      this.mode === Mode.add ? this.NOTIFICATION.ADD : this.NOTIFICATION.UPDATE;
  }

  onAddFormSubmit(): void {
    const employee = this.newEmployee;

    if (this.mode === Mode.add) {
      this.isFetching = true;
      this.employeesService.add(employee).subscribe({
        next: () => {
          this.isFetching = false;
          this.router.navigate([this.ROUTE.EMPLOYEES]);
        },
        error: (error) => {
          this.isFetching = false;
          this.error = error;
        },
      });

      return;
    }

    this.isFetching = true;
    this.employeesService.edit(employee, this.id).subscribe({
      next: () => {
        this.isFetching = false;
        this.router.navigate([this.ROUTE.EMPLOYEES.ROOT]);
      },
      error: (error) => {
        this.isFetching = false;
        this.error = error;
      },
    });
  }

  onCancellClick(): void {
    if (this.mode === Mode.add) {
      this.router.navigate([this.ROUTE.EMPLOYEES.ROOT]);

      return;
    }

    this.router.navigate([this.ROUTE.EMPLOYEES.EMPLOYEE_FULL_PASS], {
      queryParams: { id: this.id },
    });
  }

  onErrorMsgClose(): void {
    this.error = null;
  }

  private get idFromQueryParams(): string | undefined {
    return this.route.snapshot.queryParams['id'];
  }

  private get newEmployee(): Employee {
    return new Employee(
      this.editForm.value.name,
      this.editForm.value.position,
      this.editForm.value.email,
      this.editForm.value.phone,
      this.editForm.value.imgPath ? this.editForm.value.imgPath : '',
      this.id ? this.id : '',
      this.additional
    );
  }

  private get additional(): Additional {
    return new Additional(
      this.editForm.value.additional.team
        ? this.editForm.value.additional.team
        : '',
      this.editForm.value.additional.birthday
        ? this.editForm.value.additional.birthday
        : '',
      this.editForm.value.additional.startDate
        ? this.editForm.value.additional.startDate
        : '',
      this.editForm.value.additional.family
        ? this.editForm.value.additional.family
        : '',
      this.editForm.value.additional.hobbies
        ? this.editForm.value.additional.hobbies
        : ''
    );
  }
}
