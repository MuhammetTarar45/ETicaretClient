import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerNameType } from '../../base/base.component';

declare var $: any;

@Directive({
  selector: '[appDelete]',
  standalone: false
})
export class DeleteDirective {

  constructor(private elementRef: ElementRef<HTMLElement>, //elementRef html'deki işaretli directive'den geliyor.Yani td satırını ifade ediyor.
    private _rendered: Renderer2,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {
    console.log(elementRef);
    const imgElement = _rendered.createElement('img');
    const img = imgElement as HTMLElement;
    img.setAttribute("src", "/images/6827790_delete_minus_multimedia_remove_ui_icon (2).png");
    img.setAttribute("style", "cursor: pointer; width: 25px; height: 25px;");
    _rendered.appendChild(elementRef.nativeElement, img);
  }

  @Input() incomingId: string;
  @Output() callbackHilmiDeleteSonrasi: EventEmitter<any> = new EventEmitter();
  @HostListener("click")
  onClick() {
    this.spinner.show(SpinnerNameType.Work);
    this.productService.delete(this.incomingId);
    const tr = this.elementRef.nativeElement.closest("tr");
    $(tr).fadeOut(1200, () => this.callbackHilmiDeleteSonrasi.emit());
  }

  @HostBinding("style.background-color")
  writingColor: string = "green";
}