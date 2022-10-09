import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Delivery } from '../_models/delivery';
import { IOrderToCreate } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getDelivery() {
    return this.http.get(this.baseUrl + "orders/deliveries").pipe(
      map((d: any) => {
        return d
      })
    )
  }

  createOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + "orders", order)
  }
}
