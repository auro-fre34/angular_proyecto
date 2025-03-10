import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ProductService } from '../../../services/products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductFormComponent,
    PickerComponent
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductListComponent implements OnChanges {
  @Input() productList: IProduct[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedProduct: IProduct = {};
  private productService = inject(ProductService);
  public modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetailModal(product: IProduct, modal: any) {
    this.selectedProduct = { ...product };
    modal.show();
  }

  onFormEventCalled(params: IProduct) {
    this.productService.update(params);
    this.modalService.dismissAll();
  }

  deleteProduct(product: IProduct) {
    this.productService.delete(product);
  }
}
