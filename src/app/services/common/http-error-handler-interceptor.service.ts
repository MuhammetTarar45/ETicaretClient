import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor() {

  }
  private toastr: CustomToastrService = inject(CustomToastrService);


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastr.message("Yetkisiz Erişim", "401", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomCenter
          })
          break;
        case HttpStatusCode.NotFound:
          break;
        case HttpStatusCode.InternalServerError:
          this.toastr.message("Sunucu Hatası", "500", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomCenter
          })
          break;
      }
      return of(error);
    }));
  }
}