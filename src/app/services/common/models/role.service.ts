import { inject, Injectable } from '@angular/core';
import { List_Role } from '../../../contracts/roles/list_role';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }


  private readonly httpClientService: HttpClientService = inject(HttpClientService);


  async read(
    page: number,
    size: number,
    successCallBack?: () => void,
    errorCallBack?: (error: string) => void
  ): Promise<{ datas: any[]; totalCount: number }> {
    try {
      const result = await firstValueFrom(
        this.httpClientService.get<{ datas: any[]; totalCount: number }>({
          controller: 'roles',
          queryStrings: `page=${page}&size=${size}`
        })
      );

      successCallBack?.(); 
      return result;

    } catch (error) {
      const errorMessage = typeof error === 'string'
        ? error
        : error?.message ?? "Bilinmeyen bir hata oluştu.";

      errorCallBack?.(errorMessage);
      throw error; // 
    }
  }



  async create(name: any, successCallBack?: () => void, errorCallBack?: (err) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: 'roles'
    }, { name: name });

    const promiseData = firstValueFrom(observable);

    promiseData.then(value => successCallBack())
      .catch(err => errorCallBack(err));

    return await promiseData as { succeeeded: boolean };
  }
}