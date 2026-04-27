import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../../data/products';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {
  products$: Observable<Product[]>;
  private productsService = inject(ProductsService);

  constructor() {
    this.products$ = this.productsService.getAll();
  }
}
