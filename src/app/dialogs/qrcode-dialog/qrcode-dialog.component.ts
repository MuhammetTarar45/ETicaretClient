import { Component, inject, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrCodeService } from '../../services/common/qr-code-.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qrcode-dialog',
  standalone: false,
  templateUrl: './qrcode-dialog.component.html',
  styleUrl: './qrcode-dialog.component.scss'
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> {

  constructor(
    dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    super(dialogRef);
  }

  private readonly qrCodeService = inject(QrCodeService);
  private readonly domSanitizer = inject(DomSanitizer);

  qrCodeSafeUrl: SafeUrl;

  async ngOnInit() {
    debugger;
    const qrCodeBlob: Blob = await this.qrCodeService.generateQRCode(this.data);
    const url: string = URL.createObjectURL(qrCodeBlob);
    this.qrCodeSafeUrl = this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}