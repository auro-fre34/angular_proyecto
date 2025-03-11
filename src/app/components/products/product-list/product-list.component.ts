import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
    @Input() name: string = '';
    @Input() description: string = '';
    @Input() price: number = 0;
    @Input() stock: number = 0;
    @Input() category_id: number = 0;
    @Input() products: IProduct[] = [];
    @Output() callModalAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
    @Output() callDeleteAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();

    userRole: string = 'USER';
    constructor() {
        const userData = localStorage.getItem('auth_user');
        if (userData) {
            const userObj = JSON.parse(userData);
            this.userRole = userObj.role?.name || 'USER';
        }
    }

    isSuperAdmin(): boolean {
        return this.userRole === 'SUPER_ADMIN';
    }
}
