import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: (errormessage: string) => void) {
    this.httpClientService.post({
      controller: 'products'
    }, product).subscribe({
      next: result => {
        if (successCallBack) successCallBack(result);
      },
      error: (errorResponse: HttpErrorResponse) => {
        let _errors: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _errors.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}</br></br>`
          });
        });
        errorCallBack(message);
      }
    });

  }
  read(
    page: number = 0,
    size: number = 5,
    successCallBack?: (response: { totalCount: number; products: List_Product[] }) => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .get<{ totalCount: number; products: List_Product[] }>({
        controller: "products",
        queryStrings: `page=${page}&size=${size}`
      })
      .subscribe({
        next: (value: { totalCount: number; products: List_Product[] }) => {
          successCallBack({
            totalCount: value.totalCount,
            products: value.products,
          });
        },
        error: (error: HttpErrorResponse): void => {
          errorCallBack(error.message);
        },
        complete: (): void => {
        },
      });
  }
  delete(id: string) {
    this.httpClientService.delete({ controller: "products" }, id).subscribe(
      {
        next(value) {
        },
        error(err) {

        },
        complete() {
        },
      }
    );
  }
}