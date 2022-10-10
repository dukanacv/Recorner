import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Cart, ICart, ICartItem, ICartTotals } from '../_models/cart';
import { Delivery } from '../_models/delivery';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = "https://localhost:5001/api/"

  private cartSource = new BehaviorSubject<ICart>(null!)
  cart$ = this.cartSource.asObservable()

  private cartTotalSource = new BehaviorSubject<ICartTotals>(null!)
  cartTotal$ = this.cartTotalSource.asObservable()

  shipping = 0

  constructor(private http: HttpClient) { }

  getCart(cartId: string) {
    return this.http.get(this.baseUrl + "cart?cartId=" + cartId)
      .pipe(
        map((cart: any) => {
          this.cartSource.next(cart)
          this.shipping = cart.shippingPrice
          this.totals()
        })
      )
  }

  setCart(cart: ICart) {
    return this.http.post(this.baseUrl + "cart", cart).subscribe((response: any) => {
      this.cartSource.next(response)
      this.totals()
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

  incrementItemQuantity(item: ICartItem) {
    const cart = this.getCurrentCartValue()
    const foundItemIndex = cart.items.findIndex(x => x.id === item.id)
    cart.items[foundItemIndex].quantity++
    this.setCart(cart)
  }

  decrementItemQuantity(item: ICartItem) {
    const cart = this.getCurrentCartValue()
    const foundItemIndex = cart.items.findIndex(x => x.id === item.id)
    if (cart.items[foundItemIndex].quantity > 1) {
      cart.items[foundItemIndex].quantity--
      this.setCart(cart)
    } else {
      this.removeItemFromCart(item)
    }
  }

  removeItemFromCart(item: ICartItem) {
    const cart = this.getCurrentCartValue()
    if (cart.items.some(x => x.id === item.id)) {
      cart.items = cart.items.filter(i => i.id !== item.id)
      if (cart.items.length > 0) {
        this.setCart(cart)
      } else {
        this.deleteCart(cart)
      }
    }
  }

  deleteCart(cart: ICart) {
    return this.http.delete(this.baseUrl + 'cart?cartId=' + cart.id).subscribe(() => {
      this.cartSource.next(null!)
      this.cartTotalSource.next(null!)
      localStorage.removeItem("cart_id")
    }, err => console.log(err))
  }

  setShipping(delivery: Delivery) {
    this.shipping = delivery.price
    const cart = this.getCurrentCartValue()
    cart.deliveryId = delivery.id
    this.totals()
    this.setCart(cart)
  }

  createPaymen() {
    return this.http.post(this.baseUrl + "payments/" + this.getCurrentCartValue().id, {}).pipe(
      map((cart: any) => {
        this.cartSource.next(cart)
      })
    )
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

  private totals() {
    const cart = this.getCurrentCartValue()
    const shipping = this.shipping
    //callback function that sums everything => b is item, a is result that is returned, 0 is initial value
    const subtotal = cart.items.reduce((a, b) => (b.price * b.quantity) + a, 0)
    const total = shipping + subtotal
    this.cartTotalSource.next({ shipping, total, subtotal })
  }
}


