import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/interfaces';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { CurrencyPipe } from '@angular/common';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FaIconComponent, CurrencyPipe, NgbToast, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private readonly productService: ProductService = inject(ProductService);
  productList: Product[] = [];
  toast = {
    body: '',
    color: 'bg-success',
  };
  toastShow = false;
  loaded = false;

  constructor() {
    this.loadProducts();
  }

  protected loadProducts() {
    this.productService.getProducts().subscribe({
      next: (value) => {
        this.productList = value;
      },
      error: (err) => this.showToast(err.message, 'bg-danger'),
      complete: () => {
        this.loaded = true;
        this.showToast('Products loaded Successfully!', 'bg-success');
      },
    });
  }

  private showToast(message: string, color: string) {
    this.toast.body = message;
    this.toast.color = color;
    this.toastShow = true;
    setTimeout(() => {
      this.toastShow = false;
    }, 1500);
  }

  protected readonly faCartShopping = faCartShopping;
  protected readonly faEdit = faEdit;
}
