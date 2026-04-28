import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    const url = `${environment.apiBaseUrl}/assets/products.json`;
    return this.http.get<Product[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => error);
      }),
    );
  }
}
