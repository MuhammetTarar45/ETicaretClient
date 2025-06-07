import { Component, ViewChild } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
import { DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective


  constructor(public authService: AuthService,
    private toastr: CustomToastrService,
    private router: Router,
    private httpClientService: HttpClientService,
    private dynamicLoadComponentService: DynamicLoadComponentService
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

  async loadComponent() {
    this.dynamicLoadComponentService.loadComponentService(this.dynamicLoadComponentDirective.viewContainerRef, await ((await import('../app/ui/components/baskets/baskets.component')).BasketsComponent))
  }
}