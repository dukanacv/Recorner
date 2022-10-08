import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { Cart } from 'src/app/_models/cart';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {
  cart$!: Observable<Cart>

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$
  }


}
