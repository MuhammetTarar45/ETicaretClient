import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public authService: AuthService,
    private toastr: CustomToastrService,
    private router: Router,
    private httpClientService: HttpClientService
  ) {
    authService.identityCheck();
    this.httpClientService.get({
      controller: 'baskets'
    }).subscribe(data => {
      debugger;
    })
  }
  signOut() {
    localStorage.removeItem("AccessToken");
    this.authService.identityCheck();
    this.router.navigate(["home"]);
    this.toastr.message("Oturum Kapatılmıştır", "Çıkış Yapıldı", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    })
  }
}