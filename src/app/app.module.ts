import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { CommonModule, DatePipe } from '@angular/common';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    DeleteConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule

  ],
  providers: [
    EmployeeService,
    DepartmetService,
    NotificationService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EmployeeComponent,
    DeleteConfirmationDialogComponent
  ]
})
export class AppModule { }
