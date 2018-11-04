import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { DepartmetService } from '../../shared/departmet.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmetService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    // call get employees function
    this.employeeService.getEmployees();
  }

  onClear() {
    this.employeeService.form.reset();
    this.employeeService.initFormGroup();
    this.notificationService.reset('Form Clear', 'Reset');
  }

  onSubmit() {
    if (this.employeeService.form.valid) {
      this.employeeService.insertEmployee(this.employeeService.form.value);
      this.notificationService.success('New employee added', 'Submit');
      this.employeeService.form.reset();
      this.employeeService.initFormGroup();
    }
  }

}
