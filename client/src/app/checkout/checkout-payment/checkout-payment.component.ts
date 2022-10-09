import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart/cart.service';
import { ICart } from 'src/app/_models/cart';
import { IOrder } from 'src/app/_models/order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm!: FormGroup

  constructor(private cartService: CartService, private checkoutService: CheckoutService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  submitOrder() {
    const cart = this.cartService.getCurrentCartValue()
    const orderToCreate = this.getOrderToCreate(cart)
    this.checkoutService.createOrder(orderToCreate).subscribe((order: any) => {
      this.toastr.success("Uspesno kreirana porudzbina")
      this.cartService.deleteCart(cart)
      this.router.navigateByUrl("/")
    }, err => console.log(err))
  }

  private getOrderToCreate(cart: ICart) {
    return {
      cartId: cart.id,
      deliveryId: +this.checkoutForm.get("deliveryForm")?.get("delivery")?.value,
      shippingAddress: this.checkoutForm.get('addressForm')?.value
    }
  }
}
