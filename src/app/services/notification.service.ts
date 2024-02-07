import { CommonModule } from '@angular/common';
import { Component, Inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private readonly snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  /**
   * Presents a toast displaying the message with a green background
   * @param message Message to display
   * @example
   * this.notificationService.success("confirm oked");
   */
  success(message: string) {
    this.openSnackBar(message, 'success');
  }

  /**
   * Presents a toast displaying the message with a red background
   * @param message Message to display
   * @example
   * this.notificationService.error("confirm canceled");
   */
  error(message: string) {
    this.openSnackBar(message, 'error');
  }

  /**
   * Shows a confirmation modal, presenting the user with
   * an OK and Cancel button. 
   * @param message Body of the modal
   * @param okCallback Optional function to call when the user clicks Ok
   * @param title Optional modal title
   * @param cancelCallback Option function to call when the user clicks Cancel
   * @example
   * //displays a success or error message depending on what button is clicked.
   * this.notificationService.confirmation(
   * 'it will be gone forever', //message body
   * () => { //okCallback
      this.notificationService.success("confirm oked");
    },
    'Are you sure?', //title
     () => { //cancelCallback
      this.notificationService.error("confirm canceled");
    });
   */
  confirmation(
    message: string,
    okCallback: () => void,
    title = 'Are you sure?',
    cancelCallback: () => any = () => { }
  ) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '250px',
      data: { message: message, title: title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && okCallback) {
        okCallback();
      }
      if (!result && cancelCallback) {
        cancelCallback();
      }
    });
  }

  /**
  * Shows a modal, presenting the user with an OK button.
  * @param message Body of the modal
  * @param okCallback Optional function to call when the user clicks Ok
  * @param title Optional modal title
  * @example
  * //displays a success when the Ok button is clicked.
  *  this.notificationService.alert("an alert", "notice", () => {
      this.notificationService.success("alert oked");
    });
  */
  alert(message: string, title = 'Notice', okCallback: () => void = () => { }) {
    const dialogRef = this.dialog.open(AlertDialog, {
      width: '250px',
      data: { message: message, title: title },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && okCallback) {
        okCallback();
      }
    });
  }


  /**
   * Displays a toast with provided message
   * @param message Message to display
   * @param action Action text, e.g. Close, Done, etc
   * @param className Optional extra css class to apply
   * @param duration Optional number of SECONDS to display the notification for
   */
  openSnackBar(
    message: string,
    type: 'success' | 'error',
    duration = 30000
  ) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: duration,
      data: {
        message: message,
        type: type,
      },
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}

export interface DialogData {
  message: string;
  title: string;
}

@Component({
  template: `
  <div class="tw-m-4">
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
     {{data.message}}
    </div>

    <div mat-dialog-actions class="tw-flex tw-gap-3 tw-mt-4">
    <button mat-raised-button (click)="onYesClick()" color="primary">
      <mat-icon>check</mat-icon>Yes</button>
    <button mat-raised-button (click)="onNoClick()" color="warn">
      <mat-icon>cancel</mat-icon>No</button>
  </div>
  </div>
  `,
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule
  ],
})
export class ConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

@Component({
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
     {{data.message}}
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="primary" (click)="onYesClick()" cdkFocusInitial>
        Ok
      </button>
    </div>
  `
})
export class AlertDialog {
  constructor(
    public dialogRef: MatDialogRef<AlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
