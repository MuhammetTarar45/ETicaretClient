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
  const authService: AuthService = inject(AuthService);
  /* Dependency Injection End */
  spinner.show(SpinnerNameType.Routing);
  try {

    // authService.identityCheck();
    // const token = jwtHelperService.tokenGetter();
    // const expired = jwtHelperService.isTokenExpired(token.toString()); //service'yi kullandık artık buradan almıyoruz.
    debugger;
    let token: string = localStorage.getItem("AccessToken");
    let expired: boolean = jwtHelperService.isTokenExpired(token);
    if (expired) { //Değer varsa
      toastr.message("Oturum Açmanız Gerekiyor!", "Yetkisiz Girişim", {
        messageType: ToastrMessageType.Info,
        position: ToastrPosition.TopRight
      })
      spinner.hide(SpinnerNameType.Routing);
      return false;
    } else {
      spinner.hide(SpinnerNameType.Routing);
      return true;
      //Değer yoksa
      // router.navigate(["/home"], { queryParams: { returnUrl: state.url } });
      //Geldiğimiz yol route,
      //Gitmek istediğimiz yol state!

    }
  } catch (error) {
    spinner.hide(SpinnerNameType.Routing);
    //router.navigate(["/home"], { queryParams: { returnUrl: state.url } });
    toastr.message("Oturum Açmanız Gerekiyor", "Yetkisiz Girişim", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    })
    return false;
  }
};
// export function isAuth() {
//   return "";
// }