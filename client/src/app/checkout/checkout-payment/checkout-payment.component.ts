import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart/cart.service';
import { ICart } from 'src/app/_models/cart';
import { IOrder } from 'src/app/_models/order';
import { CheckoutService } from '../checkout.service';

declare var Stripe: any;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkoutForm!: FormGroup

  @ViewChild('cardNumber', { static: true }) cardNumberElement!: ElementRef
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement!: ElementRef
  @ViewChild('cardCvc', { static: true }) cardCvcElement!: ElementRef

  stripe: any
  cardNumber: any
  cardExpiry: any
  cardCvc: any

  cardNumberValid = false
  cardExpiryValid = false
  cardCvcValid = false
  cardHandler = this.onChange.bind(this);

  constructor(private cartService: CartService, private checkoutService: CheckoutService,
    private toastr: ToastrService, private router: Router) { }

  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_51Lr44UBo42gBPr6nitSJmblYuhy8petd3ZP2QYeji4osfNGta0hVShdSeLvM6EPzaF17bnIG2vI4wPUNGQN1l2sZ00hazzuKpq')
    const elements = this.stripe.elements()

    this.cardNumber = elements.create('cardNumber')
    this.cardNumber.mount(this.cardNumberElement.nativeElement)
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry')
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement)
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc')
    this.cardCvc.mount(this.cardCvcElement.nativeElement)
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.cardNumber.destroy()
    this.cardExpiry.destroy()
    this.cardCvc.destroy()
  }

  onChange(event: any) {
    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
    }
  }

  submitOrder() {
    const cart = this.cartService.getCurrentCartValue()
    const orderToCreate = this.getOrderToCreate(cart)
    this.checkoutService.createOrder(orderToCreate).subscribe((order: any) => {
      this.toastr.success("Uspesno kreirana porudzbina")
      this.stripe.confirmCardPayment(cart.clientSecret, {
        payment_method: {
          card: this.cardNumber,
          billing_details: {
            name: this.checkoutForm.get("paymentForm")?.get("nameOnCard")?.value
          }
        }
      }).then((result: any) => {
        console.log(result)
        if (result.paymentIntent) {
          this.cartService.deleteCart(cart)
          this.router.navigateByUrl("/")
        } else {
          this.toastr.error(result.error.message)
        }
      })
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
