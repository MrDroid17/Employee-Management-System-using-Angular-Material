import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material/material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeService } from './shared/employee.service';
import { firebaseConfig } from '../environments/firebase.config';
import { environment } from '../environments/environment.prod';
import { DepartmetService } from './shared/departmet.service';
import { NotificationService } from './shared/notification.service';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule

  ],
  providers: [
    EmployeeService,
    DepartmetService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
