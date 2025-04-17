import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, private toastr: CustomToastrService) { }


  async identityCheck() {
    try {
      let token: string = localStorage.getItem("AccessToken");
      let expired: boolean = this.jwtHelper.isTokenExpired(token);

      if (expired) {
        _isAuthenticated = false;

      } else {
        _isAuthenticated = true;
      }
    } catch (error) {

    }

    return _isAuthenticated;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}


export let _isAuthenticated: boolean;