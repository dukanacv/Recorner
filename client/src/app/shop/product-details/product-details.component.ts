import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from 'src/app/_models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product
  quantity: number = 1

  constructor(private shopService: ShopService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.shopService.getProduct(Number(this.route.snapshot.paramMap.get('id'))).subscribe(response => {
      this.product = response
    }, err => console.log(err))
  }

  addItemToCart() {
    this.cartService.addItem(this.product, this.quantity)
  }

  incrementQuantity() {
    this.quantity++
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--
    }
  }
}
