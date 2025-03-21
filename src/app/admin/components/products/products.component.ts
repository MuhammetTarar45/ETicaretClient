import { AfterViewInit, Component } from '@angular/core';
import { BaseComponent, SpinnerNameType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Product } from '../../../contracts/product';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent {
  constructor(spinnerService: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinnerService);
  }
  ngOnInit() {
    this.showSpinner(SpinnerNameType.Routing);
    // ---***GET***---
    this.httpClientService.get<Product[]>({
      controller: "products"
    }).subscribe(datas => console.log(datas));

    //----***POST***---
    this.httpClientService.post<Product>({
      controller: "products",
    },
      {
        
      }
    ).subscribe(message => console.log(message));
    // -* PUT *-
    // this.httpClientService.put({
    //   controller: "products"
    // },
    //   {
    //     id: "d69cfd20-19c5-4f85-8e26-61911a8ed484",
    //     name: "fazaa",
    //   }).subscribe(response => console.log(response));

    // -* DELETE *-
    // this.httpClientService.delete({
    //   controller: 'products'
    // },
    //   "36a70088-4732-49cb-9902-77c26f73cc80"
    // ).subscribe();
  }
}