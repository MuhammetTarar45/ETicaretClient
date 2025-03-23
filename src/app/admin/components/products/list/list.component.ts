import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_products';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerNameType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent {
  constructor(private productService: ProductService, spinnerService: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinnerService)
  }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate'];

  dataSource: MatTableDataSource<List_Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  ngAfterViewInit() {
    this.getProducts();
  }

  async pageChanged() {
    await this.getProducts();
  }
  getProducts() {
    this.showSpinner(SpinnerNameType.Work);
    this.productService.read(
      this.paginator.pageIndex ?? 0,
      this.paginator.pageSize ?? 5,
      (response: { totalCount: number; products: List_Product[] }) => {
        this.dataSource = new MatTableDataSource<List_Product>(response.products);
        this.paginator.length = response.totalCount;
        this.hideSpinner(SpinnerNameType.Work);
      },
      (errorMessage: string) => {
        this.hideSpinner(SpinnerNameType.Work);
        this.alertify.message(errorMessage, {
          messageType: AlertifyMessageType.Error
        });
      }
    );
  }
}