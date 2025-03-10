import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ProductFormComponent } from "../../components/products/product-form/product-form.component";
import { ProductListComponent } from "../../components/products/product-list/product-list.component";
import { IProduct } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/products.service";

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [
        ProductListComponent,
        ProductFormComponent,
        PaginationComponent,
        ModalComponent,
        LoaderComponent,
        ProductFormComponent
    ],
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    public productService: ProductService = inject(ProductService);
    public modalService: NgbModal = inject(NgbModal);
    public route: ActivatedRoute = inject(ActivatedRoute);
    public authService: AuthService = inject(AuthService);
    public routeAuthorities: string[] = [];
    public areActionsAvailable: boolean = false;

    ngOnInit(): void {
        this.authService.getUserAuthorities();
        this.productService.getAll();
        this.route.data.subscribe(data => {
            this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
        });
    }
    openModal(content: any) {
        this.modalService.open(content); // Pass the template reference to open
    }

    onFormEventCalled(params: IProduct) {
        this.productService.save(params);
        this.modalService.dismissAll();
    }
}
