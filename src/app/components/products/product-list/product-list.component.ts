import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../../interfaces';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
    @Input() name: string = '';
    @Input() description: string = '';
    @Input() price: number = 0;
    @Input() stock: number = 0;
    @Input() products: IProduct[] = [];
    @Output() callModalAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
    @Output() callDeleteAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
}
