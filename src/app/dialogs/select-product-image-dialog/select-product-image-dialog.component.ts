import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileOptionalParameters } from '../../services/file-upload/file-upload.component';

@Component({
  selector: 'app-select-product-image-dialog',
  standalone: false,
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.scss'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {

  @Output() fileForOptionalParameters: Partial<FileOptionalParameters>;

  constructor(dialogRef:
    MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {

    super(dialogRef);
    this.initializeFileParameters();
  }

  private initializeFileParameters() {
    this.fileForOptionalParameters = {
      controller: "products",
      action: `uploadfile`,
      isAdmin: true,
      explanation: "Ürün resmini seçiniz veya buraya sürükleyiniz",
      accept: ".jpg",
      queryString: `id=${this.data}`
    };
  }
}

export enum SelectProductImageState {
  Close
}