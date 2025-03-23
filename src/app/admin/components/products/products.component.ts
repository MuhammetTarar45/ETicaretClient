import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerNameType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Product } from '../../../contracts/create_product';
import { ListComponent } from './list/list.component';

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
  @ViewChild(ListComponent) listComponents: ListComponent;

  createdProduct(create_product: Create_Product) {
    this.listComponents.getProducts();
  }
}