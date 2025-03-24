import { Component } from '@angular/core';
import { BaseComponent, SpinnerNameType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-error',
  standalone: false,
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent extends BaseComponent {
  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService)
  }
  // ngOnInit() {
  //   this.showSpinner(SpinnerNameType.Routing);
  // }
}