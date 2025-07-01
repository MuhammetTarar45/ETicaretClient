import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from "../services/file-upload/file-upload.module";
import { MatCardModule } from '@angular/material/card';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { QrcodeDialogComponent } from './qrcode-dialog/qrcode-dialog.component';
import { QrcodeReadingDialogComponent } from './qrcode-reading-dialog/qrcode-reading-dialog.component';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';


@NgModule({
  declarations: [
    DialogDeleteComponent,
    // FileUploadDialogComponent,
    SelectProductImageDialogComponent,
    AuthorizeMenuDialogComponent,
    AuthorizeUserDialogComponent,
    QrcodeDialogComponent,
    QrcodeReadingDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule,
    FileUploadModule, MatBadgeModule, MatListModule,
    NgxScannerQrcodeComponent,
  ],
  exports: []
})
export class DialogModule { }
