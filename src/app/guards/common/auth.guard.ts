import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerNameType } from '../../base/base.component';
import { _isAuthenticated, AuthService } from '../../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  /* Dependency Injection Start */
  const jwtHelperService: JwtHelperService = inject(JwtHelperService);
  const router: Router = inject(Router);
  const toastr: CustomToastrService = inject(CustomToastrService);
  const spinner: NgxSpinnerService = inject(NgxSpinnerService);

  /* Dependency Injection End */
  spinner.show(SpinnerNameType.Routing);


  try {
    // const token = jwtHelperService.tokenGetter();
    // const expired = jwtHelperService.isTokenExpired(token.toString());
    if (_isAuthenticated) { //Değer varsa
      spinner.hide(SpinnerNameType.Routing);
      return true;
    } else { //Değer yoksa
      router.navigate(["login"], { queryParams: { returnUrl: state.url } }); //Gitmek istenilen state.url , 
      //Geldiğimiz yol route,
      //Gitmek istediğimiz yol state!
      toastr.message("Oturum Açmanız Gerekiyor", "Yetkisiz Girişim", {
        messageType: ToastrMessageType.Info,
        position: ToastrPosition.TopRight
      })
      spinner.hide(SpinnerNameType.Routing);
      return false;
    }
  } catch (error) {
    spinner.hide(SpinnerNameType.Routing);
    router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    toastr.message("Oturum Açmanız Gerekiyor", "Yetkisiz Girişim", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    })
    return true;
  }
};