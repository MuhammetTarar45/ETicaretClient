import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../common/http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from '../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogParameters, DialogService } from '../common/dialog.service';
import { data, error } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerNameType } from '../../base/base.component';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent extends BaseComponent {
  constructor(private httpClientService: HttpClientService,
    private dialogService: DialogService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }
  readonly dialog = inject(MatDialog);



  @Input() optionals: Partial<FileOptionalParameters> = new FileOptionalParameters();

  public files: NgxFileDropEntry[] = [];



  public dropped(files: NgxFileDropEntry[]) {
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: DeleteState.Yes,
      afterClosedCallBack: () => {
        this.showSpinner(SpinnerNameType.Work);
        this.files = files;
        for (const droppedFile of files) {
          if (droppedFile.fileEntry.isFile) {
            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
              const formData = new FormData();
              formData.append(file.name, file, file.name);
              this.httpClientService.post({
                controller: this.optionals.controller,
                action: this.optionals.action,
                queryStrings: this.optionals.queryString
              }, formData)
                .subscribe(data => {
                  this.files = [];
                  this.hideSpinner(SpinnerNameType.Work);
                });
            });
          }
        }
      }
    });
  }
}



// dialogRef.afterClosed().subscribe(result => {
//   console.log(result);



export class FileOptionalParameters {
  controller: string;
  action: string;
  queryString: string;
  explanation: string;
  accept: string;
  isAdmin: boolean = false;
}
export enum DeleteState {
  Yes,
  No
}