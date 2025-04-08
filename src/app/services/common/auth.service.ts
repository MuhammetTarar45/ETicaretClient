import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, private toastr: CustomToastrService) { }

  async identityCheck() {

    try {
      const token: Promise<string> | string = await this.jwtHelper.tokenGetter();

      const expired: boolean = this.jwtHelper.isTokenExpired(token);
      if (token != null && token && !expired) {
        _isAuthenticated = true;

      } else {
        _isAuthenticated = false;
      }
    } catch (error) {
      _isAuthenticated = false;

    }

    //_isAuthenticated = token != null && !expired; // token null değilse VE expired zamanı geçmemişse token'i ver diyoruz.
    //Yani Authenticated değerine true diyoruz.
  }
  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}


export let _isAuthenticated: boolean;