import { Component } from '@angular/core';
import { AlertifyService, AlertifyMessageType, AlertifyPosition } from '../../services/admin/alertify.service';


@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private alertify: AlertifyService) {

  }
  ngOnInit() {
    this.alertify.message("Hello Man", { delay: 3, messageType: AlertifyMessageType.Success, position: AlertifyPosition.TopLeft });
  }
}