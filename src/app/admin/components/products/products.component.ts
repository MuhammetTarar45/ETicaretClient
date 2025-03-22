import { AfterViewInit, Component } from '@angular/core';
import { BaseComponent, SpinnerNameType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent {
  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }
  ngOnInit() {
    this.showSpinner(SpinnerNameType.Routing);
  }
}