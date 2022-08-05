import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import  {productsTypes}  from '../../models/product-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productList: any;

  searchKey: string = '';
  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res: any) => {
      this.productList = res;

      this.productList.forEach((currProduct: productsTypes) => {
        Object.assign(currProduct, { quantity: 1, total: currProduct.price });
      });
    });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  add(item: productsTypes) {
    item.qnt += 1;
  }

  minus(item: productsTypes) {
    if (item.qnt != 0) {
      item.qnt -= 1;
    }
  }

  addToCart(item : string) {
    this.cartService.addtoCart(item);
  }

  sortProduct(option:any) {
    if (option.value == 'l2h') {
      this.productList.sort((a: productsTypes, b: productsTypes) => (a.price > b.price ? 1 : -1));
    } else if (option.value == 'h2l') {
      this.productList.sort((a: productsTypes, b: productsTypes) => (a.price < b.price ? 1 : -1));
    } else if (option.value == 'a2z') {
      this.productList.sort((a: productsTypes, b: productsTypes) => (a.title > b.title ? 1 : -1));
    }
  }
}
