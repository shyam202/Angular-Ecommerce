import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';


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

      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  add(item: any) {
    item.qnt += 1;
  }

  minus(item: any) {
    if (item.qnt != 0) {
      item.qnt -= 1;
    }
  }

  addToCart(item: any) {
    this.cartService.addtoCart(item);
  }

  sortProduct(option: any) {
    if (option.value == 'l2h') {
      this.productList.sort((a: any, b: any) => (a.price > b.price ? 1 : -1));
    } else if (option.value == 'h2l') {
      this.productList.sort((a: any, b: any) => (a.price < b.price ? 1 : -1));
    } else if (option.value == 'a2z') {
      this.productList.sort((a: any, b: any) => (a.title > b.title ? 1 : -1));
    }
  }
}
