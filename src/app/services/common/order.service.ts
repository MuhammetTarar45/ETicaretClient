import { inject, Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Create_Order } from '../../contracts/orders/create_order';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly httpClientService = inject(HttpClientService);

  constructor() { }

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: 'orders'
    }, order);

    await firstValueFrom(observable);
  }
}