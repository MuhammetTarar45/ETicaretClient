import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  openDialog(dialogParameters: Partial<DialogParameters>) {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: '750px',
      data: dialogParameters.data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogParameters.data)
        dialogParameters.afterClosedCallBack(); //callBack func
    })
  }
}

export class DialogParameters {
  componentType: ComponentType<any>;
  data: any;
  afterClosedCallBack: () => void;
}