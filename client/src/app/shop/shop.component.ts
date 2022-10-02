import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild("search") searchTerm!: ElementRef
  search!: string

  products!: Product[] | null
  brands!: Brand[]
  productTypes!: ProductType[]

  brandNameSelected!: string

  sortSelected = "name"
  sortOptions = [
    { name: "Ime", value: "name" },
    { name: "Cena: rastuca", value: "priceAsc" },
    { name: "Cena: opadajuca", value: "priceDesc" }
  ]

  currentPage: number = 1
  pageSize: number = 6
  totalItems!: number

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
    this.getProductTypes()
  }

  getProducts() {
    this.shopService.getProducts(this.brandNameSelected, this.sortSelected,
      this.currentPage, this.pageSize, this.search).subscribe((response) => {
        this.products = response.body
        let str = response.headers.get("Pagination")
        let obj = JSON.parse(str!)
        this.currentPage = obj.currentPage
        this.pageSize = obj.itemsPerPage
        this.totalItems = obj.totalItems
      }, err => console.log(err))
  }

  getAllProducts() {
    this.brandNameSelected = ''
    this.getProducts()
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = response//spread operator
    }, err => console.log(err))
  }

  getProductTypes() {
    this.shopService.getProductTypes().subscribe(response => {
      this.productTypes = response
    }, err => console.log(err))
  }

  onBrandSelected(brandName: string) {
    this.brandNameSelected = brandName
    this.currentPage = 1
    this.getProducts()
  }

  onSortSelected(sort: string) {
    this.sortSelected = sort
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.currentPage !== event) {
      this.currentPage = event.page
      this.getProducts()
    }
  }

  onSearch() {
    this.search = this.searchTerm.nativeElement.value
    this.getProducts()
  }

  onResetFilters() {
    this.searchTerm.nativeElement.value = null
    window.location.reload()
  }
}
