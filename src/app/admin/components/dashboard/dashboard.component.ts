import { Component, inject } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

import { SignalRService } from '../../../services/common/signalR.service';
import { HubUrls } from '../../../constants/hubUrls';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../../services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent {

  private signalRService = inject(SignalRService);
  private readonly toastrService = inject(CustomToastrService);
  private readonly alertifyService = inject(AlertifyService);
  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }
  ngOnInit(): void {
    this.signalRService.on(HubUrls.ProductHub, 'receiveProductAddedMessage', message => {
      this.alertifyService.message(message, {
        position: AlertifyPosition.TopLeft,
        messageType: AlertifyMessageType.Success
      })
    })
    this.signalRService.on(HubUrls.OrderHub, 'receiveOrderAddedMessage', message => {
      this.toastrService.message(message, 'Başarılı', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomCenter
      })
    })
  }
}