import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebaseDatabase: AngularFireDatabase) { }

  employeeList: AngularFireList<any>;

  // $key is  primary key
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireData: new FormControl(''),
    isPermanent: new FormControl(false),
  });


  initFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: '0',
      hireData: '',
      isPermanent: false,
    });
  }

  // get employee
  getEmployees() {
    this.employeeList = this.firebaseDatabase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  // insert employee
  insertEmployee(employee) {
    this.employeeList.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireData: employee.hireData,
      isPermanent: employee.isPermanent,
    });
  }

  // update employee
  updateEmployee(employee) {
    this.employeeList.update(employee.$key, {
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireData: employee.hireData,
      isPermanent: employee.isPermanent,
    });
  }

  // delete employee
  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }
}
