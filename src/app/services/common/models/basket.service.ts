import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { List_Basket } from '../../../contracts/baskets/list_basket';
import { Create_Basket_Item } from '../../../contracts/baskets/create_basket_item';
import { firstValueFrom, Observable } from 'rxjs';
import { Update_Basket_Item } from '../../../contracts/baskets/update_basket_item';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private readonly httpClientService = inject(HttpClientService);

  constructor() { }

  basketList: List_Basket[];

  get(sucessCallBack?: (data: List_Basket[]) => void, errorCallBack?: () => void) {
    this.httpClientService.get<List_Basket[]>({
      controller: 'baskets',
    }).subscribe({
      next: value => sucessCallBack(this.basketList = value),
      error: (err) => errorCallBack()
    })
  }

  async create(basketItems: Create_Basket_Item, successCallBack?: () => void): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: 'baskets'
    }, basketItems)

    await firstValueFrom(observable);
    successCallBack();
  }

  async put(basketItems: Update_Basket_Item, successCallBack?: () => void): Promise<void> {
    const observable: Observable<any> = this.httpClientService.put({
      controller: 'baskets'
    }, basketItems)
    await firstValueFrom(observable);
    successCallBack();
  }

  async remove(basketItemId: string, successCallBack?: () => void) {
    const observable: Observable<any> = this.httpClientService.delete({
      controller: 'baskets'
    }, basketItemId)

    await firstValueFrom(observable);
    successCallBack();
  }

}