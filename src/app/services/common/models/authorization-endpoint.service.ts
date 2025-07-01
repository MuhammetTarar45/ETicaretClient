import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor() { }

  private readonly httpClientService: HttpClientService = inject(HttpClientService);




  async assignRoleEndpoint(roles: string[], code: string, menu: string) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: 'AuthorizationEndpoints',
    }, {
      roles: roles,
      code: code,
      menu: menu
    });

    await firstValueFrom(observable);
  }
}