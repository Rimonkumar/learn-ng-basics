import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 75000 },
    { id: 2, name: 'Mouse', price: 800 },
    { id: 3, name: 'Keyboard', price: 1500 },
  ]);

  getProducts() {
    return this.products.asReadonly();
  }

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct = {
      ...product,
      id: Math.max(0, ...this.products().map((p) => p.id)) + 1,
    };
    this.products.update((prev) => [...prev, newProduct]);
  }

  updateProduct(updatedProduct: Product) {
    this.products.update((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  }

  deleteProduct(id: number) {
    this.products.update((prev) => prev.filter((p) => p.id !== id));
  }
}
