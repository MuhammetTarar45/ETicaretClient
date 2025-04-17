import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerNameType } from '../../base/base.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor() {

  }
  private toastr: CustomToastrService = inject(CustomToastrService);
  private userAuthService: UserAuthService = inject(UserAuthService);
  private spinner: NgxSpinnerService = inject(NgxSpinnerService);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      console.log('interceptor devreye girer misin!');

      switch (error.status) {
        case HttpStatusCode.Unauthorized:


          this.userAuthService.refreshTokenLogin(localStorage.getItem("RefreshToken")).then(data => {

          });
          // this.toastr.message("Yetkisiz Erişim", "401", {

          //   messageType: ToastrMessageType.Warning,
          //   position: ToastrPosition.BottomCenter
          // })
          this.spinner.hide(SpinnerNameType.Routing);
          this.spinner.hide(SpinnerNameType.Work);
          break;
        case HttpStatusCode.NotFound:
          this.spinner.hide(SpinnerNameType.Work);
          break;
        case HttpStatusCode.InternalServerError:
          this.toastr.message("Sunucu Hatası", "500", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomCenter
          })
          this.spinner.hide(SpinnerNameType.Routing);
          this.spinner.hide(SpinnerNameType.Work);
          break;
      }
      return of(error);
    }));
  }
}