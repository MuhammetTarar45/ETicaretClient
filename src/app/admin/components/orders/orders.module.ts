import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { ListOrderComponent } from './list-order/list-order.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DeleteDirectiveModule } from '../../../directives/admin/delete-directive.module';
@NgModule({
  declarations: [
    OrdersComponent,
    ListOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: OrdersComponent }
    ]),
    MatPaginatorModule, MatTableModule, DeleteDirectiveModule
  ],
  exports: []
})
export class OrdersModule { }
