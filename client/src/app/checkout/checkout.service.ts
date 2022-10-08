import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Delivery } from '../_models/delivery';

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
}
