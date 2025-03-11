import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ICategory } from "../../../interfaces";

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
    @Input() name: string = '';
    @Input() description: string = '';
    @Input() categories: ICategory[] = [];
    @Output() callModalAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
    @Output() callDeleteAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
}