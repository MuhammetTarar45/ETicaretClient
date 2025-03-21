import { Component } from '@angular/core';
import { AlertifyOptions, AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';


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
    this.alertify.message("Hello Man", { delay: 3, messageType: MessageType.Success, position: Position.TopLeft });
  }
}