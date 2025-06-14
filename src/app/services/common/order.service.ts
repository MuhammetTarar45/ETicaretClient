import { inject, Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Create_Order } from '../../contracts/orders/create_order';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Orders } from '../../contracts/orders/list_orders';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly httpClientService = inject(HttpClientService);

  constructor() { }

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: 'orders'
    }, order);

    await firstValueFrom(observable);
  }

  get(page: number = 0, size: number = 5, sucessCallBack?: (value: { orderTotalCount: number, listOrders: List_Orders[] }) => void, errorCallBack?: (error: string | HttpErrorResponse) => void) {
    this.httpClientService.get<{ orderTotalCount: number, listOrders: List_Orders[] }>({
      controller: 'orders',
      queryStrings: `page=${page}&size=${size}`
    }).subscribe({
      next: (value: { orderTotalCount: number, listOrders: List_Orders[] }) => {
        sucessCallBack(
          { orderTotalCount: value.orderTotalCount, listOrders: value.listOrders }
        );
      },
      error(err: HttpErrorResponse) {
        errorCallBack?.(err.message);
      },
    })
  }
}