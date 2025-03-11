import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProduct, IResponse, ISearch } from '../interfaces';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseService<IProduct> {
    protected override source: string = 'products';
    private productListSignal = signal<IProduct[]>([])
    get products$() {
        return this.productListSignal;
    }
    public search: ISearch = {
        page: 1,
        size: 5
    }
    public totalItems: any = [];
    private authService: AuthService = inject(AuthService);
    private alertService: AlertService = inject(AlertService);

    getAll() {
        this.findAllWithParams(this.search).subscribe({
            next: (response: IResponse<IProduct[]>) => {
                this.search = { ...this.search, ...response.meta };
                this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
                this.productListSignal.set(response.data);
                console.log('Products fetched', response.data);
            },
            error: (err: any) => {
                console.error('Error fetching products', err);
            }
        });
    }


    save(item: IProduct) {
        this.add(item).subscribe({
            next: (response: IResponse<IProduct>) => {
                this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
                this.getAll();
            },
            error: (err: any) => {
                this.alertService.displayAlert('error', 'An error occurred adding product', 'center', 'top', ['error-snackbar']);
                console.error('Error saving product', err);
            }
        });
    }

    update(product: IProduct) {
        this.editCustomSource(`${product.id}`, product).subscribe({
            next: (response: any) => {
                this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);

            },
            error: (err: any) => {
                this.alertService.displayAlert('error', 'An error occurred updating the product', 'center', 'top', ['error-snackbar']);
                console.error('error', err);
            }
        });
    }
    delete(product: IProduct) {
        this.delCustomSource(`${product.id}`).subscribe({
            next: (response: any) => {
                this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);

            },
            error: (err: any) => {
                this.alertService.displayAlert('error', 'An error occurred deleting the product', 'center', 'top', ['error-snackbar']);
                console.error('error', err);
            }
        });
    }

}
