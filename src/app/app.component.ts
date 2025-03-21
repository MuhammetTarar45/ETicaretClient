import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private toastrService: CustomToastrService, private spinner: NgxSpinnerService) {


  }
}

//  $.get("https://localhost:5001/api/Products").subscribe(datas => console.log(datas));
$.get("https://localhost:5001/api/Products", datas => datas.forEach(data => console.log(data.name)));