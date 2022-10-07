import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Recorner';

  constructor(private cartService: CartService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadCart()
    this.loadCurrentUser()
  }

  loadCurrentUser() {
    const token = localStorage.getItem("token")
    if (token) {
      this.userService.getCurrentUser(token).subscribe(response => {
      }, err => console.log(err))
    }
  }

  loadCart() {
    const cartId = localStorage.getItem("cart_id")
    if (cartId) {
      this.cartService.getCart(cartId).subscribe(() => {
      }, err => console.log(err))
    }
  }
}
