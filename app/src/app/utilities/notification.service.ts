import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {
  }

  notify(message) {
    this.snackBar.open(message, 'ОК', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 3000,
    });
  }
}
