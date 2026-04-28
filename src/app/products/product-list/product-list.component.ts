import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductsService, Product } from '../services/products.service';
import { PricePipe } from '../../shared/pipes/price.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PricePipe],
  templateUrl: './product-list.component.html',
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 1rem;
        font-family: 'Inter', sans-serif;
      }
      .form-card {
        background: #f8fafc;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        border: 1px solid #e2e8f0;
      }
      .search-box {
        width: 100%;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
      }
      th,
      td {
        text-align: left;
        padding: 12px;
        border-bottom: 1px solid #e2e8f0;
      }
      th {
        background: #f1f5f9;
        color: #475569;
      }
      .btn {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        transition: 0.2s;
      }
      .btn-primary {
        background: #2563eb;
        color: white;
      }
      .btn-primary:hover {
        background: #1d4ed8;
      }
      .btn-edit {
        background: #059669;
        color: white;
        margin-right: 5px;
      }
      .btn-delete {
        background: #dc2626;
        color: white;
      }
      .form-group {
        display: flex;
        gap: 10px;
        margin-top: 10px;
      }
      input {
        padding: 0.5rem;
        border: 1px solid #cbd5e1;
        border-radius: 4px;
      }
    `,
  ],
})
export class ProductListComponent {
  private fb = inject(FormBuilder);
  private productsService = inject(ProductsService);

  searchTerm = signal('');
  editingId = signal<number | null>(null);

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(1)]],
  });

  // Computed signal for filtered products
  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const allProducts = this.productsService.getProducts()();
    return allProducts.filter((p) => p.name.toLowerCase().includes(term));
  });

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value as Omit<Product, 'id'>;

      if (this.editingId()) {
        this.productsService.updateProduct({
          ...formValue,
          id: this.editingId()!,
        });
        this.editingId.set(null);
      } else {
        this.productsService.addProduct(formValue);
      }

      this.productForm.reset({ name: '', price: 0 });
    }
  }

  editProduct(product: Product) {
    this.editingId.set(product.id);
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id);
    }
  }

  cancelEdit() {
    this.editingId.set(null);
    this.productForm.reset({ name: '', price: 0 });
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}
