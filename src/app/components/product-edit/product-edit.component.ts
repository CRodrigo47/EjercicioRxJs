import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';


@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [NgbToast, CurrencyPipe, FaIconComponent, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  private readonly productService: ProductService = inject(ProductService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private edit = false;
  load = false;
  @Input('id') id!: number;
  formProduct: FormGroup = this.formBuilder.group({
    id: [0, [Validators.required]],
    title: ['', [Validators.required]],
    price: [0, [Validators.required]],
    description: ['', [Validators.required]],
    category: ['', [Validators.required]],
    image: ['', [Validators.required]],
    rating: this.formBuilder.group({
      rate: [0, [Validators.required]],
      count: [0, [Validators.required]],
    }),
  });

  get title(): any {
    return this.formProduct.get('title');
  }

  get rate(): any {
    return this.formProduct.get('rating.rate');
  }

  get count(): any {
    return this.formProduct.get('rating.count');
  }

  get price(): any {
    return this.formProduct.get('price');
  }

  get description(): any {
    return this.formProduct.get('description');
  }

  get category(): any {
    return this.formProduct.get('category');
  }

  get image(): any {
    return this.formProduct.get('image');
  }

  ngOnInit(): void {
    if (this.id) {
      this.edit = true;
      this.productService.getProduct(this.id).subscribe({
        next: (value) => {
          this.formProduct.setValue(value);
          this.showToast('Product loaded successfully!', 'bg-success', 1200);
        },
        error: (err) => {
          this.showToast(err.message, 'bg-danger', 2200);
        },
        complete: () => (this.load = true),
      });
    } else {
      this.load = true;
      this.edit = false;
      this.formProduct.reset();
    }
  }

  toast = {
    body: '',
    color: 'bg-success',
  };
  toastShow = false;

  onSubmit() {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
      return;
    }
    if (this.edit) {
      this.productService
        .updateProduct(this.formProduct.getRawValue())
        .subscribe({
          next: (value) => {
            this.showToast(
              value.title + ' updated successfully',
              'bg-success',
              1200
            );
          },
          error: (err) => {
            this.showToast(err.message, 'bg-danger', 2200);
          },
        });
    } else {
      this.productService.addProduct(this.formProduct.getRawValue()).subscribe({
        next: (value) => {
          this.showToast(
            value.title + ' added successfully',
            'bg-success',
            1200
          );
        },
        error: (err) => {
          this.showToast(err.message, 'bg-danger', 2200);
        },
      });
    }
  }

  private showToast(message: string, color: string, duration: number) {
    this.toast.body = message;
    this.toast.color = color;
    this.toastShow = true;
    setTimeout(() => {
      this.toastShow = false;
    }, duration);
  }

  protected readonly faCartShopping = faCartShopping;
  protected readonly faEdit = faEdit;
  protected readonly faTrashCan = faTrashCan;
}
