import { Component, inject, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Product } from '../../../contracts/products/create_product';
import { ListComponent } from './list/list.component';
import { AuthService } from '../../../services/common/auth.service';

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
  authService: AuthService = inject(AuthService);
  @ViewChild(ListComponent) listComponents: ListComponent;
  
  lastProductList(productList: Create_Product) { //Burası List_Product Olmalı ama değer gönderirken Create_product gönderiyoruz List yapınca hata alıyoruz. En başta değer gönderirken de List gibi biçimlerde göndermeliyiz ama böyle kalsa da olur.
    this.authService.identityCheck();
    this.listComponents.getProducts();
  }
}