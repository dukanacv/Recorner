import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { ICartTotals } from 'src/app/_models/cart';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit {
  cartTotal$!: Observable<ICartTotals>

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartTotal$ = this.cartService.cartTotal$
  }

}
