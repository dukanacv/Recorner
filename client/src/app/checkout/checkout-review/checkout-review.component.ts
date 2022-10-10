import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { Cart } from 'src/app/_models/cart';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {
  cart$!: Observable<Cart>

  @Input() appStepper!: CdkStepper

  constructor(private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$
  }

  createPayment() {
    return this.cartService.createPaymen().subscribe(response => {
      this.toastr.success("Placanje uspesno")
      this.appStepper.next()
    }, error => {
      console.log(error)
      this.toastr.error(error.message)
    })
  }
}
