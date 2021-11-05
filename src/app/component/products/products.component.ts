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
  searchKey : string = "";
  constructor(private api: ApiService, private cartService : CartService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res: any) => {
      this.productList = res;

      this.productList.forEach((a: any)=>{
          Object.assign(a,{quantity:1,total:a.price});
      });
    });
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  addToCart(item: any){
    this.cartService.addtoCart(item);
  }



}
