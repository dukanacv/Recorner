import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addItemToCart() {
    this.cartService.addItem(this.product)
  }

}
