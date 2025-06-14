import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '../../../../services/common/order.service';
import { List_Orders } from '../../../../contracts/orders/list_orders';
@Component({
  selector: 'app-list-order',
  standalone: false,
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.scss'
})
export class ListOrderComponent implements AfterViewInit {

  private readonly orderService = inject(OrderService);

  dataSource = new MatTableDataSource<List_Orders>;

  displayedColumns: string[] = ['address', 'description', 'createdDate', 'delete'];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.getOrders();
  }
  async pageChanged() {
    await this.getOrders();
  }
  getOrders(page: number = 0, size: number = 5) {
    this.orderService.get(this.paginator.pageIndex ?? page, this.paginator.pageSize ?? size, data => {
      this.dataSource = new MatTableDataSource<List_Orders>(data.listOrders);
      this.paginator.length = data.orderTotalCount;
    }, err => {
      console.log(err);
    })
  }
}