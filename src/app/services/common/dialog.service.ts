import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;
declare var bootstrap: any;
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  openDialog(dialogParameters: Partial<DialogParameters>) {

    const modalElement = document.getElementById('basketItemModal');
    debugger;

    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);

    modalInstance.hide();

    const dialogRef = this.dialog.open(dialogParameters.componentType, {

      width: '750px',
      data: dialogParameters.data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === dialogParameters.data) {
        dialogParameters.afterClosedSuccessCallBack();
        modalInstance.show()
      } else {
        dialogParameters.afterClosedErrorCallBack();
        modalInstance.show()
      }

      setTimeout(() => modalInstance.show(), 200);
    })
  }
}

export class DialogParameters {
  componentType: ComponentType<any>;
  data: any;
  afterClosedSuccessCallBack: () => void;
  afterClosedErrorCallBack?: () => void;
}