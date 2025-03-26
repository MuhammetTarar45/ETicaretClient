import { Component, Input, Output } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../common/http-client.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  constructor(private httpClient: HttpClient) {

  }
  @Input() contentName: string;
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          console.log(droppedFile.relativePath, file);


          const formData = new FormData()
          formData.append('formFiles', file, file.name)
          debugger;


          this.httpClient.post('https://localhost:5001/api/products/uploadfile', formData)
            .subscribe(data => {
              console.log("başarılı dosya aktarımı.");
            })
        });
      }
    }
  }
}