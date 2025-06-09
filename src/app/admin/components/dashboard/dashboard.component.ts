import { Component, inject } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

import { SignalRService } from '../../../services/common/signalR.service';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hubUrls';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../../services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent {

  private signalRService = inject(SignalRService);
  private readonly alertifyService = inject(AlertifyService);

  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
    // this.signalRService.start(HubUrls.ProductHub) //localhost:5001
    //  await this.signalRService.start('pro-hub');
    // this.signalRService.start(HubUrls.OrderHub) //localhost:5001 
  }
  async ngOnInit() {
    await this.signalRService.start(HubUrls.OrderHub);
    this.signalRService.on('receiveOrderAddedMessage', message => {
      alert('hii');
    })
  }
}