import { Component, Input, Output } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../common/http-client.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  constructor(private httpClientService: HttpClientService) {

  }

  @Input() optionals: Partial<FileOptionalParameters> = new FileOptionalParameters();
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          const formData = new FormData();
          formData.append('formFiles', file, file.name);
          this.httpClientService.post({
            controller: this.optionals.controller,
            action: this.optionals.action,
          }, formData)
            .subscribe(data => {
              console.log("başarılı dosya aktarımı.");
            })
        });
      }
    }
  }
}
export class FileOptionalParameters {
  controller: string;
  action: string;
  queryString: string;
  explanation: string;
  accept: string;
  isAdmin: boolean = false;
}