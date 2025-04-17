import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    authService.identityCheck();
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

// $.get("https://localhost:5001/api/Products", datas => datas.forEach(data => console.log(data.name)));
