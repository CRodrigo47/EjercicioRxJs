import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/interfaces';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http: HttpClient = inject(HttpClient);

  constructor(){

  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(
      environment.urlBase
    )
  }

  getProduct(id:number): Observable<Product>{
    return this.http.get<Product>(
      environment.urlBase+id
    )
  }

  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(environment.urlBase, product)
  } 

  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(environment.urlBase+product.id, product)
  }

  deleteProduct(id: number): Observable<Product>{
    return this.http.delete<Product>(environment.urlBase+id)
  }
}
