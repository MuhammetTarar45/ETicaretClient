import { Component } from '@angular/core';
import { BaseComponent, SpinnerNameType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-baskets',
  standalone: false,
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss'
})
export class BasketsComponent extends BaseComponent {
  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService)
  }
  ngOnInit() {
    this.showSpinner(SpinnerNameType.Routing);
  }
}
