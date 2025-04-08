import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { registerUser } from '../../../entities/registerUser';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_User } from '../../../contracts/users/create_user';
import { Token } from '../../../contracts/token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from '../../../contracts/token/tokenResponse';

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
  async login(user: any, successCallBack?: () => void): Promise<any> {
    const observable: Observable<any | Token> = this.httpClientService.post<any | Token>({
      controller: 'users',
      action: 'login'
    }, user);
    const responseToken: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    //gelen veri {token:{token:.....}} şeklinde o yüzden böyle yaptık!
    const token = responseToken.token as Token;

    if (token) {
      //console.log(token);
      localStorage.setItem("AccessToken", token.accessToken);
      this.toastrService.message("Kullanıcı Girişi Başarılı", "Başarılı :)", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    else {
      console.log('Token Değeri Boş!');
      this.toastrService.message("Kullanıcı Girişi Hatalı!", "Hatalı!", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
    }
    successCallBack();
    return token;
  }
}