import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { EmployeeService } from '../../shared/employee.service';
import { DepartmetService } from '../../shared/departmet.service';
import { database } from 'firebase';

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

  constructor(private employeeService: EmployeeService,
    private departmentService: DepartmetService) { }

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
      this.employeelistData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
        });
      };
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.employeelistData.filter = this.searchKey.trim().toLowerCase();
  }

}
