import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { EmployeeService } from '../../shared/employee.service';
import { DepartmetService } from '../../shared/departmet.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from '../../shared/notification.service';
import { DialogService } from '../../shared/dialog.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeelistData: MatTableDataSource<any>;
  searchKey: string;
  // array of columns
  displayedColumns = ['fullName', 'email', 'mobile', 'city', 'departmentName', 'isPermanent', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmetService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dilaogService: DialogService
  ) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(list => {
      const employeeArray = list.map(item => {
        const departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
        return {
          $key: item.key,
          departmentName,
          ...item.payload.val()
        };
      });
      // convert list in data source
      this.employeelistData = new MatTableDataSource(employeeArray);
      this.employeelistData.sort = this.sort;
      this.employeelistData.paginator = this.paginator;
      // filter predicate
      // this.employeelistData.filterPredicate = (data, filter) => {
      //   return this.displayedColumns.some(ele => {
      //     return (ele !== 'actions') && (data[ele].toLowerCase().indexOf(filter) !== -1);
      //   });
      // };
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.employeelistData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreateEmployee() {
    this.employeeService.initFormGroup();
    this.DialogConfig();
  }

  onEdit(row) {
    // row will have details of all the form
    this.employeeService.populateForm(row);
    this.DialogConfig();
  }

  onDelete($key) {
    this.dilaogService
      .openDeleteDialog('Are you sure to delete employee?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.employeeService.deleteEmployee($key);
          this.notificationService.delete('! Employee Successfully removed.', 'Deleted');
        }
      });
  }

  // define dialog configuration
  private DialogConfig() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }
}
