import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../_models/cart';
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

}
