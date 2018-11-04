import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { EmployeeService } from '../../shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeelistData: MatTableDataSource<any>;
  searchKey: string;
  // array of columns
  displayedColumns = ['fullName', 'email', 'mobile', 'city', 'isPermanent', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(list => {
      const employeeArray = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      // convert list in data source
      this.employeelistData = new MatTableDataSource(employeeArray);
      this.employeelistData.sort = this.sort;
      this.employeelistData.paginator = this.paginator;
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
