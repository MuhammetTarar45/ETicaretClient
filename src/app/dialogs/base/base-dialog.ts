import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<TDialogComponent> {

    constructor(public dialogRef: MatDialogRef<TDialogComponent>) {
    }
    close(state: string) {
        this.dialogRef.close(state);
    }
}