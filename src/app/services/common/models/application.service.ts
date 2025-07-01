import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Menu } from '../../../contracts/application-configurations/menu';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private readonly httpClientService = inject(HttpClientService);

  constructor() { }

  async getAuthorizeDefinitionEndPoints() {
    const observable = this.httpClientService.get<Menu[]>({
      controller: 'ApplicationServices',
    })

    return await firstValueFrom(observable);
  }
}