import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { registerUser } from '../../../entities/registerUser';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_User } from '../../../contracts/users/create_user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) {

  }
  async create(user: registerUser): Promise<Create_User> {
    const observable: Observable<registerUser | Create_User> = this.httpClientService.post<registerUser | Create_User>({
      controller: 'users',
    }, user);
    return await firstValueFrom(observable) as Create_User;
  }
}