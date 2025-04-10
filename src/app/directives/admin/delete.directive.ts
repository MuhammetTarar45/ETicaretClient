import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerNameType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';


import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../services/admin/alertify.service';
import { DeleteState, DialogDeleteComponent } from '../../dialogs/dialog-delete/dialog-delete.component';
import { DialogService } from '../../services/common/dialog.service';
declare var $: any;

@Directive({
  selector: '[appDelete]',
  standalone: false,

})
export class DeleteDirective {
  private imgElement: HTMLElement;


  constructor(private elementRef: ElementRef<HTMLElement>, //elementRef html'deki işaretli directive'den geliyor.Yani td satırını ifade ediyor.
    private _rendered: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private dialogService: DialogService
  ) {


    this.imgElement = _rendered.createElement('img');
    const img = this.imgElement as HTMLElement;
    img.setAttribute("src", "/images/6827790_delete_minus_multimedia_remove_ui_icon (2).png");
    img.setAttribute("style", "cursor: pointer; width: 25px; height: 25px;");
    _rendered.appendChild(elementRef.nativeElement, img);
  }
  readonly dialog = inject(MatDialog);
  @Input() controllerInput: string;
  @Input() incomingId: string;
  @Output() callbackHilmiDeleteSonrasi: EventEmitter<any> = new EventEmitter();
  @HostListener("click")
  onClick() {
    this.dialogService.openDialog({
      componentType: DialogDeleteComponent,
      data: DeleteState.Yes,
      afterClosedCallBack: () => {
        this.spinner.show(SpinnerNameType.Work);
        this.httpClientService.delete({ controller: this.controllerInput }, this.incomingId).subscribe(data => {
          const tr = this.elementRef.nativeElement.closest("tr");
          this.alertify.message("Ürün Başarıyla Silinmiştir.", {
            delay: 4,
            messageType: AlertifyMessageType.Success,
            position: AlertifyPosition.TopRight
          })
          $(tr).fadeOut(1200, () => this.callbackHilmiDeleteSonrasi.emit());
          this.spinner.hide(SpinnerNameType.Work);
        });
      }
    }
    )
  }

  //@HostBinding("style.background-color")
  // writingColor: string = "blue";
  // writingColor2: string = "#2f2f32";
}