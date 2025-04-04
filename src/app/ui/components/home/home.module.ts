import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    // RouterModule.forChild([
    //   {path:"",component:HomeComponent}
    // ]) //gerek yok zaten routing de direkt path ve comp olarak verdim Module'yi vermedim.
  ]
})
export class HomeModule { }
