import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup

  constructor(private fb: FormBuilder, private userService: UserService, private cartService: CartService) { }

  ngOnInit(): void {
    this.createCheckoutForm()
    this.getAndSetAddress()
    this.getDeliveryValues()
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        delivery: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    })
  }

  getAndSetAddress() {
    this.userService.getUserAddress().subscribe(response => {
      if (response) {
        this.checkoutForm.get("addressForm")?.patchValue(response)
      }
    }, err => console.log(err))
  }

  getDeliveryValues() {
    const cart = this.cartService.getCurrentCartValue()
    if (cart.deliveryId !== null) {
      this.checkoutForm.get("deliveryForm")!.get("delivery")?.patchValue(cart.deliveryId!.toString())
    }
  }
}
