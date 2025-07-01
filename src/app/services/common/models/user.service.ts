import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { registerUser } from '../../../entities/registerUser';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_User } from '../../../contracts/users/create_user';
import { CustomToastrService } from '../../ui/custom-toastr.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService,
    private toastrService: CustomToastrService
  ) {

  }
  async create(user: registerUser, successCallBack?: () => void): Promise<Create_User> {
    const observable: Observable<registerUser | Create_User> = this.httpClientService.post<registerUser | Create_User>({
      controller: 'users',
    }, user);
    return await firstValueFrom(observable) as Create_User;
  }

  async updatePassword(userId: string, resetToken: string, password: string, successCallBack?: () => void, errorCallBack?: () => void) {
    const observable = this.httpClientService.post({
      controller: 'users',
      action: 'update-password'
    },
      {
        userId: userId,
        resetToken: resetToken,
        password: password
      });

    await firstValueFrom(observable)
      .then(value => successCallBack())
      .catch(err => errorCallBack());
  }

  async getAllUser() {
    const observable: Observable<any> = this.httpClientService.get({
      controller: 'users'
    })
    return await firstValueFrom(observable);
  }

  async assignRoleToUser(id: string, roles: string[]) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: 'users',
      action: 'assign-role-to-user'
    }, {
      userId: id,
      roles: roles
    });

    await firstValueFrom(observable);
  }


  async getRolesToUser(userId: string): Promise<{ userRoles: string[] }> {
    const observable: Observable<{ userRoles: string[] }> = await this.httpClientService.get({
      controller: 'users',
      action: 'get-roles-to-user'
    }, userId);

    return await firstValueFrom(observable);
  }
}