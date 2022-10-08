import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Delivery } from 'src/app/_models/delivery';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.css']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm!: FormGroup
  delivery!: Delivery[]

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.getDeliveries()
  }

  getDeliveries() {
    this.checkoutService.getDelivery().subscribe(response => {
      this.delivery = response
    }, err => console.log(err))
  }
}
