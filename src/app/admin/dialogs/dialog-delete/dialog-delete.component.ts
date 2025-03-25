import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  standalone: false,
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss'
})
export class DialogDeleteComponent {
  readonly dialogRef = inject(MatDialogRef<DialogDeleteComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { confirm: string }) { }

  openDialogYes(result: string) {
    this.dialogRef.close(result);
  }
}