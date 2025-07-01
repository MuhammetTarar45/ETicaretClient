import { Component, ElementRef, inject, Inject, OnDestroy, ViewChild } from '@angular/core';
import { QrCodeService } from '../../services/common/qr-code-.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { ProductService } from '../../services/common/models/product.service';




@Component({
  selector: 'app-qrcode-reading-dialog',
  standalone: false,
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrl: './qrcode-reading-dialog.component.scss'
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnDestroy {

  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) {
    super(dialogRef);
  }

  private readonly toastrService = inject(CustomToastrService);
  private readonly productService = inject(ProductService);

  @ViewChild("scanner", { static: true }) scanner: NgxScannerQrcodeComponent;

  @ViewChild("txtStock", { static: true }) txtStock: ElementRef;



  async ngOnInit() {
    this.scanner.start();
  }
  ngOnDestroy(): void {
    this.scanner.stop();
  }

  async qrCodeEvent(e: any) {
    if (e[0].value != null) {
      const jsonData = JSON.parse(e[0].value);
      const txtStock = (this.txtStock.nativeElement as HTMLInputElement).value;
      this.scanner.stop();
      document.getElementById('btnClose').click();

      await this.productService.updateStockQrCodeToProduct(jsonData.Id, parseInt(txtStock), () => {
        this.toastrService.message(`${jsonData.Name} ürünün stok bilgisi ${parseInt(txtStock)} değeriyle güncellenmiştir.`, 'Başarılı', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.BottomCenter
        })
      }, () => {
        this.toastrService.message(`Güncellenemedi`, 'Başarısız', {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.BottomCenter
        })
      });
    }
  }

  restartScanner() {
    this.scanner.start();
  }
}