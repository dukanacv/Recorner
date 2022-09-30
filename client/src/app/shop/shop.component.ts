import { Component, OnInit } from '@angular/core';
import { Brand } from '../_models/brand';
import { Product } from '../_models/product';
import { ProductType } from '../_models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products!: Product[] | null
  brands!: Brand[]
  productTypes!: ProductType[]
  brandNameSelected!: string

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
    this.getProductTypes()
  }

  getProducts() {
    this.shopService.getProducts(this.brandNameSelected).subscribe(response => {
      this.products = response
    }, err => console.log(err))
  }

  getAllProducts() {
    this.shopService.getProducts().subscribe(response => {
      this.products = response
    }, err => console.log(err))
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = response//spread operator
      console.log(this.brands)
    }, err => console.log(err))
  }

  getProductTypes() {
    this.shopService.getProductTypes().subscribe(response => {
      this.productTypes = response
    }, err => console.log(err))
  }

  onBrandSelected(brandName: string) {
    this.brandNameSelected = brandName
    this.getProducts()
  }
}
