import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, RippleRef } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right'
  };

  success(msg, action) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, action, this.config);
  }

  reset(msg, action) {
    this.config['panelClass'] = ['notification', 'reset'];
    this.snackBar.open(msg, action, this.config);
  }
}