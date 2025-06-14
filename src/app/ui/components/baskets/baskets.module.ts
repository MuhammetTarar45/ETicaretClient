import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsComponent } from './baskets.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    BasketsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: BasketsComponent }
    ]),
    CommonModule, FormsModule, SweetAlert2Module.forChild()
  ],
  exports: [
    BasketsComponent
  ]
})
export class BasketsModule { }