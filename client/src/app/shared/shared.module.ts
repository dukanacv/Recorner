import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from "ngx-bootstrap/pagination";
import { OrderTotalsComponent } from './order-totals/order-totals.component'



@NgModule({
  declarations: [
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [
    PaginationModule,
    OrderTotalsComponent
  ]
})
export class SharedModule { }
