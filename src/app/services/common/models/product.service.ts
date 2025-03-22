import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';

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
        if (successCallBack) successCallBack(result); // Başarılı cevap varsa callback'i çağır
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
}
