import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ProductFormComponent } from "../../components/products/product-form/product-form.component";
import { ProductListComponent } from "../../components/products/product-list/product-list.component";
import { IProduct } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/products.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from "../../components/modal/modal.component";


@Component({
    selector: 'app-product',
    standalone: true,
    imports: [
        ProductListComponent,
        ProductFormComponent,
        PaginationComponent,
        ModalComponent,
        LoaderComponent,

    ],
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    public productService: ProductService = inject(ProductService);
    public modalService: ModalService = inject(ModalService);
    public route: ActivatedRoute = inject(ActivatedRoute);
    public authService: AuthService = inject(AuthService);
    @ViewChild('addProductModal') public addProductModal: any;
    public fb: FormBuilder = inject(FormBuilder);
    productForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        stock: ['', Validators.required],

    })
    constructor() {
        this.productService.search.page = 1;
        this.authService.isSuperAdmin() ? this.productService.getAll() : this.productService.getAllByUser();
    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    saveProduct(product: IProduct) {
        this.productService.save(product);
        this.modalService.closeAll();
    }

    callEdition(product: IProduct) {
        this.productForm.controls['id'].setValue(product.id ? JSON.stringify(product.id) : '');
        this.productForm.controls['name'].setValue(product.name ? (product.name) : '');
        this.productForm.controls['description'].setValue(product.description ? product.description : '');
        this.productForm.controls['price'].setValue(product.price ? JSON.stringify(product.price) : '');
        this.productForm.controls['stock'].setValue(product.stock ? JSON.stringify(product.stock) : '');
        this.modalService.displayModal('md', this.addProductModal);
    }

    updateProduct(product: IProduct) {
        this.productService.update(product);
        this.modalService.closeAll();
    }
}

