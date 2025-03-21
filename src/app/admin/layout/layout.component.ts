import { Component } from '@angular/core';
import { AlertifyService, AlertifyMessageType, AlertifyPosition } from '../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private alertify: AlertifyService, private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.spinner.show("routing");
    this.alertify.message("Hello Man", { delay: 3, messageType: AlertifyMessageType.Success, position: AlertifyPosition.TopLeft });
    setTimeout(() => {
      this.spinner.hide("routing")
    }, 2000);
  }
}