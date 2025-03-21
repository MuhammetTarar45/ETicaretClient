import { Component } from '@angular/core';
import { BaseComponent, SpinnerNameType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { data } from 'jquery';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent extends BaseComponent {
  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService)
  }
  ngOnInit() {
    this.showSpinner(SpinnerNameType.Routing);
  }
}