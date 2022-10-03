import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Cart, ICart, ICartItem } from '../_models/cart';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = "https://localhost:5001/api/"

  private cartSource = new BehaviorSubject<ICart>(null!)
  cart$ = this.cartSource.asObservable()

  constructor(private http: HttpClient) { }

  getCart(cartId: string) {
    return this.http.get(this.baseUrl + "cart?cartId=" + cartId)
      .pipe(
        map((cart: any) => {
          this.cartSource.next(cart)
        })
      )
  }

  setCart(cart: ICart) {
    return this.http.post(this.baseUrl + "cart", cart).subscribe((response: any) => {
      this.cartSource.next(response)
      console.log(response)
    }, err => console.log(err))
  }

  getCurrentCartValue() {
    return this.cartSource.value
  }

  addItem(item: Product, quantity = 1) {
    const itemToAdd: ICartItem = this.mapItem(item, quantity)
    const cart = this.getCurrentCartValue() ?? this.createCart()
    cart.items = this.addOrUpdateToCart(cart.items, itemToAdd, quantity)
    this.setCart(cart)
  }

  private addOrUpdateToCart(items: ICartItem[], itemToAdd: ICartItem, quantity: number): ICartItem[] {
    const i = items.findIndex(i => i.id === itemToAdd.id)

    if (i === -1) {
      itemToAdd.quantity = quantity
      items.push(itemToAdd)
    } else {
      items[i].quantity += quantity
    }
    return items
  }

  private createCart(): ICart {
    const cart = new Cart()
    localStorage.setItem("cart_id", cart.id)
    return cart
  }

  private mapItem(item: Product, quantity: number): ICartItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity: quantity,
      brand: item.productBrand,
      type: item.productType
    }
  }
}


