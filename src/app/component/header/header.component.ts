import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  public searchTerm: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }

  fruitDetails(): void {
    this.router.navigate(['products']);
  }
}
