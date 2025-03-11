import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input()
  productForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  callSave() {
    let item: IProduct = {
      name: this.productForm.controls['name'].value,
      description: this.productForm.controls['description'].value,
      price: this.productForm.controls['price'].value,
      stock: this.productForm.controls['stock'].value,
    };
    (item as any).category = { id: this.productForm.controls['category_id'].value };

    if (this.productForm.controls['id'].value) {
      item.id = this.productForm.controls['id'].value;

    } if (item.id) {
      this.callUpdateMethod.emit(item);
    } else {
      this.callSaveMethod.emit(item)
    }
  }
}
