import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../_models/brand';
import { Product } from '../_models/product';
import { ProductType } from '../_models/productType';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl + "products?pageSize=50")
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + "products/brands")
  }

  getProductTypes() {
    return this.http.get<ProductType[]>(this.baseUrl + "products/types")
  }
}
