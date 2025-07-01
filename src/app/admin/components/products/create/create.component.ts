import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { Create_Product } from '../../../../contracts/products/create_product';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerNameType } from '../../../../base/base.component';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../../../services/admin/alertify.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { QrcodeReadingDialogComponent } from '../../../../dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';


@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {
    super(spinner);
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  private readonly dialogService = inject(DialogService);
  // @Output() fileForOptionalParameters: Partial<FileOptionalParameters> = {
  //   controller: "products",
  //   action: "uploadfile",
  //   isAdmin: true,
  //   explanation: "Görsel Yükleyiniz",
  //   accept: ".jpg , .jpeg , .png",
  // }


  createWButton(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerNameType.Work);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseInt(price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerNameType.Work),
        this.alertify.message('Ürün Başarıyla Eklendi', {
          delay: 7,
          messageType: AlertifyMessageType.Message,
          position: AlertifyPosition.TopLeft
        });
      this.createdProduct.emit(create_product);
    }, error => { // Hata olursa
      this.hideSpinner(SpinnerNameType.Work);
      this.alertify.message(error, { messageType: AlertifyMessageType.Error, delay: 10 });
    }
    );
  }

  showProductQrCodeReading() {
    this.dialogService.openDialog({
      componentType: QrcodeReadingDialogComponent,
      data: 'Yes',
      afterClosedSuccessCallBack: () => {

      }, afterClosedErrorCallBack: () => {

      }
    })
  }


} 