import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { UserService } from 'src/app/user/user.service';
import { ICart } from 'src/app/_models/cart';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  cart$!: Observable<ICart>
  currentUser$!: Observable<User>

  constructor(private cartService: CartService, private userService: UserService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$
    this.currentUser$ = this.userService.currentUser$
  }

  logout() {
    this.userService.logout()
  }
}
