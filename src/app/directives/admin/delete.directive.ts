import { ChangeDetectionStrategy, Directive, ElementRef, EventEmitter, HostBinding, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerNameType } from '../../base/base.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogDeleteComponent } from '../../admin/dialogs/dialog-delete/dialog-delete.component';
declare var $: any;

@Directive({
  selector: '[appDelete]',
  standalone: false,

})
export class DeleteDirective {
  private imgElement: HTMLElement;


  constructor(private elementRef: ElementRef<HTMLElement>, //elementRef html'deki işaretli directive'den geliyor.Yani td satırını ifade ediyor.
    private _rendered: Renderer2,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {


    this.imgElement = _rendered.createElement('img');
    const img = this.imgElement as HTMLElement;
    img.setAttribute("src", "/images/6827790_delete_minus_multimedia_remove_ui_icon (2).png");
    img.setAttribute("style", "cursor: pointer; width: 25px; height: 25px;");
    _rendered.appendChild(elementRef.nativeElement, img);
  }
  readonly dialog = inject(MatDialog);

  @Input() incomingId: string;
  @Output() callbackHilmiDeleteSonrasi: EventEmitter<any> = new EventEmitter();
  @HostListener("click", ["$event"])
  onClick(event: Event) {
    if (event.target === this.imgElement)
      this.openDialog('200ms', '200ms', () => {
        this.spinner.show(SpinnerNameType.Work);
        this.productService.delete(this.incomingId);
        const tr = this.elementRef.nativeElement.closest("tr");
        $(tr).fadeOut(1200, () => this.callbackHilmiDeleteSonrasi.emit());
      })
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, callBackDelete?: () => void): void {
    const dialogOpen = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: { confirm: "yes" },
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogOpen.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        callBackDelete();
      }
    })
  }
  @HostBinding("style.background-color")
  writingColor: string = "green";




}