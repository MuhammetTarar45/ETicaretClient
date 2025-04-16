import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from '../../../contracts/token/token';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService,
    private toastrService: CustomToastrService) { }

  async login(user: any, successCallBack?: () => void): Promise<any> {
    const observable: Observable<any | Token> = this.httpClientService.post<any | Token>({
      controller: 'auth',
      action: 'login'
    }, user);
    const responseToken: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    //gelen veri {token:{token:.....}} şeklinde o yüzden böyle yaptık!
    const token = responseToken.token as Token;

    if (token) {
      //console.log(token);
      localStorage.setItem("AccessToken", token.accessToken);
      localStorage.setItem("RefreshToken", token.refreshToken);
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
  async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      controller: 'auth',
      action: 'refreshTokenLogin'
    }, { refreshToken: refreshToken });

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (!!tokenResponse) {
      localStorage.setItem("AccessToken", tokenResponse.token.accessToken);
      localStorage.setItem("RefreshToken", tokenResponse.token.refreshToken);
    }

    callBackFunction();
  }
  async googleLogin(user: any, callBackFunction?: () => void) {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller: 'auth',
      action: 'google-login'
    }, user);
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (!!tokenResponse) {

      localStorage.setItem("AccessToken", tokenResponse.token.accessToken);
      localStorage.setItem("RefreshToken", tokenResponse.token.refreshToken);
      this.toastrService.message("Google üzerinden giriş başarılı :)", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }

    callBackFunction();
  }
  async facebookLogin(user: SocialUser, callBackFunction?: () => void) {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller: 'auth',
      action: 'facebook-login'
    }, user);

    const tokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (!!tokenResponse) {
      localStorage.setItem("AccessToken", tokenResponse.token.accessToken);
      localStorage.setItem("RefreshToken", tokenResponse.token.refreshToken);
      this.toastrService.message("Facebook ile giriş başarılı", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }
}