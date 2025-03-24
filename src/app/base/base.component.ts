import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
  constructor(private spinnerService: NgxSpinnerService) {
  }
  showSpinner(spinnerNameType: SpinnerNameType) {
    this.spinnerService.show(spinnerNameType);
  }
  hideSpinner(spinnerNameType: SpinnerNameType) {
    this.spinnerService.hide(spinnerNameType);
  }
}


export enum SpinnerNameType {
  Routing = "routing",
  Work = "work"
}