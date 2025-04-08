import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AdminModule, UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"], //Sadece buraya gönder!
        disallowedRoutes: ["edevlet.com"] //Buraya hiçhiç gönderme demiş ouyoruz
      }
    })
  ],
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    { provide: "baseUrl", useValue: 'https://localhost:5001/api' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
export function tokenGetter() {
  return localStorage.getItem('AccessToken')
}
