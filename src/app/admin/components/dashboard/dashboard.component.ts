import { Component, inject } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

import { SignalRService } from '../../../services/common/signalR.service';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hubUrls';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent {

  private signalRService = inject(SignalRService);

  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
    this.signalRService.start(HubUrls.ProductHub) //localhost:5001 
  }

  ngOnInit() {
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      alert(message);
    })
  }
}