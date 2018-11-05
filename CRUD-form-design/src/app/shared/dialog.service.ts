import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDeleteDialog() {
    const config = new MatDialogConfig();
    config.width = '350px';
    config.disableClose = true;
    config.panelClass = 'confirm-dialog-container';

    this.dialog.open(DeleteConfirmationDialogComponent, config);


  }
}
