import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart, ICartItem } from '../_models/cart';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart$!: Observable<ICart>

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$
  }

  removeCartItem(item: ICartItem) {
    this.cartService.removeItemFromCart(item)
  }

  incrementItemQuantity(imte: ICartItem) {
    this.cartService.incrementItemQuantity(imte)
  }

  decrementItemQuantity(item: ICartItem) {
    this.cartService.decrementItemQuantity(item)
  }
}
