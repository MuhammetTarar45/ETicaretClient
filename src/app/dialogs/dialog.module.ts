import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from "../services/file-upload/file-upload.module";
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    DialogDeleteComponent,
    // FileUploadDialogComponent,
    SelectProductImageDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule,
    FileUploadModule,
  ],
  exports: []
})
export class DialogModule { }
