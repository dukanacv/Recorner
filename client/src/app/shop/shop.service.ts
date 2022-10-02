import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Brand } from '../_models/brand';
import { PaginatedResult } from '../_models/pagination';
import { Product } from '../_models/product';
import { ProductType } from '../_models/productType';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:5001/api/"

  paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>()

  constructor(private http: HttpClient) { }

  getProducts(brandName?: string, sort?: string, page?: number, itemsPerPage?: number, search?: string) {
    let params = new HttpParams();

    if (sort) {
      params = params.append("sort", sort)
    }

    if (brandName) {
      params = params.append("brandName", brandName)
    }

    if (page !== null && itemsPerPage !== null) {
      params = params.append("pageNumber", page?.toString()!)
      params = params.append("pageSize", itemsPerPage?.toString()!)
    }

    if (search) {
      params = params.append("search", search)
    }

    return this.http.get<Product[]>(this.baseUrl + "products", { observe: "response", params })
      .pipe(
        map(response => {
          this.paginatedResult.result = response.body!
          if (response.headers.get('Pagination') !== null) {
            this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination")!)
          }
          return response
        })
      )
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + "products/brands")
  }

  getProductTypes() {
    return this.http.get<ProductType[]>(this.baseUrl + "products/types")
  }
}
