import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ICategory } from "../../../interfaces";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
    @Input() name: string = '';
    @Input() description: string = '';
    @Input() categories: ICategory[] = [];
    @Output() callModalAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
    @Output() callDeleteAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();

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