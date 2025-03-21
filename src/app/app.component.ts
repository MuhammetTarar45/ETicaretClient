import { Component } from '@angular/core';
import { CustomToastrService } from './services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {


  }
}

// $.get("https://localhost:5001/api/Products", datas => datas.forEach(data => console.log(data.name)));
