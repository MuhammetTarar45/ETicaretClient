import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { List_Product } from '../../../../contracts/products/list_products';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../../../services/common/models/basket.service';
import { Create_Basket_Item } from '../../../../contracts/baskets/create_basket_item';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerNameType } from '../../../../base/base.component';

@Component({
  selector: 'app-list-product',
  standalone: false,
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent {

  private productService = inject(ProductService);
  public productList: List_Product[];
  public activatedRoute = inject(ActivatedRoute);
  public pageNo: number;
  public sizeNo: number = 4;
  public pageNoPrevious: number;
  public pageNoAfter: number;
  public baseUrl: any = 'https://localhost:5001/';
  public totalProductCount: number;

  private readonly basketService = inject(BasketService);
  private readonly spinnerService = inject(NgxSpinnerService);
  constructor() {

  }
  ngOnInit(): void {
    this.spinnerService.show(SpinnerNameType.Routing);
    this.activatedRoute.params.subscribe({
      next: param => {
        this.pageNo = parseInt(param["pageNo"] ?? 1);
        this.productService.read(this.pageNo - 1, this.sizeNo, (response) => {
          this.productList = response.products;
          this.totalProductCount = response.totalCount;
          this.pageNoPrevious = this.pageNo - 1;
          if (this.pageNoPrevious == 0) {
            this.pageNoPrevious = 1
            this.pageNo = this.pageNoPrevious + 1;
          }
          this.pageNoAfter = this.pageNo + 1;
        });
      }
    });
    this.spinnerService.hide(SpinnerNameType.Routing);
  }

  addToBasket(productId: string) {
    let items = new Create_Basket_Item();
    items.productId = productId;
    this.basketService.create(items);
  }
}