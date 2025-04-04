import { Component, ElementRef, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileOptionalParameters } from '../../services/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { List_Product_Image } from '../../contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerNameType } from '../../base/base.component';
import { event } from 'jquery';

declare var $: any;

@Component({
  selector: 'app-select-product-image-dialog',
  standalone: false,
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.scss'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  @Output() fileForOptionalParameters: Partial<FileOptionalParameters>;

  constructor(dialogRef:
    MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private productService: ProductService,
    private spinner: NgxSpinnerService
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
      accept: ".jpg , .jpeg , .png",
      queryString: `id=${this.data}`
    };
  }
  private matCard;
  imageClick(event: MouseEvent) {
    console.log(event);

    this.matCard = (event.target as HTMLElement).closest("mat-card");
    console.log(this.matCard);
  }
  images: List_Product_Image[];
  async ngOnInit() {
    this.spinner.show(SpinnerNameType.Work);
    this.images = await this.productService.readImages(this.data as string, () => this.spinner.hide(SpinnerNameType.Work));
  }
  async removeImage(imageId: any) {
    this.spinner.show(SpinnerNameType.Work);
    await this.productService.deleteImage(this.data as string, imageId, () => {
      this.spinner.hide(SpinnerNameType.Work);
      // this.images = this.images.filter(image => image.id !== imageId); // Güncelleme
      $(this.matCard).fadeOut(700);
    })
  }
}
export enum SelectProductImageState {
  Close
}