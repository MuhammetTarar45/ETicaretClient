import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/products/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/products/list_products';
import { firstValueFrom, identity, Observable } from 'rxjs';
import { get } from 'jquery';
import { List_Product_Image } from '../../../contracts/products/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: (errormessage: string) => void) {
    this.httpClientService.post({
      controller: 'products',
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

  async readImages(id: string, successCallBack?: () => void): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      controller: "products",
      action: "getproductimages",
    }, id)
    const images = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }
  async deleteImage(id: string, imageId: string, successCallBack: () => void) {
    const deleteObservable = this.httpClientService.delete({
      controller: 'products',
      action: 'deleteproductimage',
      queryStrings: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deleteObservable);
    successCallBack();
  }
}