import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
  constructor(private spinnerService: NgxSpinnerService) {
  }
  showSpinner(spinnerNameType: SpinnerNameType) {
    this.spinnerService.show(spinnerNameType);
    setTimeout(() => {
      this.hideSpinner(spinnerNameType);
    }, 8000); //Sunucu hatası vs. olursa da 8 saniyeden fazla beklemesin sonsuza kadar beklemesin demiş oldum yani.
  }
  hideSpinner(spinnerNameType: SpinnerNameType) {
    this.spinnerService.hide(spinnerNameType);
  }
}


export enum SpinnerNameType {
  Routing = "routing",
  Work = "work"
}