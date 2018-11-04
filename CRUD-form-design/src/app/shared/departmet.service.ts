import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DepartmetService {
  department_list: AngularFireList<any>;
  departmentArray = [];
  constructor(private firebaseDatabase: AngularFireDatabase) {
    // department array
    this.department_list = this.firebaseDatabase.list('departments');
    this.department_list.snapshotChanges().subscribe(list => {
      this.departmentArray = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  // using lodash to get department name
  getDepartmentName($key) {
    if ($key === '0') {
      return '';
    } else {
      return _.find(this.departmentArray, obj => obj.$key === $key)['name'];
    }
  }
}
