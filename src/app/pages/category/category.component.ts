import { Component, inject, ViewChild } from "@angular/core";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { LoaderComponent } from "../../components/loader/loader.component";
import { CategoryFormComponent } from "../../components/category/category-form/category-form.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { CategoryService } from "../../services/category.service";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ModalService } from "../../services/modal.service";
import { ICategory } from "../../interfaces";
import { CategoryListComponent } from "../../components/category/category-list/category-list.component";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    selector: 'app-category',
    imports: [
        CategoryComponent,
        PaginationComponent,
        ModalComponent,
        LoaderComponent,
        CategoryFormComponent,
        CategoryListComponent,
        CommonModule
    ],
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
    public categoryService: CategoryService = inject(CategoryService);
    public modalService: ModalService = inject(ModalService);
    public authService: AuthService = inject(AuthService);
    @ViewChild('addCategoryModal') public addCategoryModal: any;
    public fb: FormBuilder = inject(FormBuilder);
    categoryForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required],

    })

    userRole: string = 'USER';
    constructor() {
        this.categoryService.search.page = 1;
        this.categoryService.getAll();

        const userData = localStorage.getItem('auth_user');
        if (userData) {
            const userObj = JSON.parse(userData);
            this.userRole = userObj.role?.name || 'USER';
        }
    }
    isSuperAdmin(): boolean {
        return this.userRole === 'SUPER_ADMIN';
    }

    saveCategory(category: ICategory) {
        this.categoryService.save(category);
        this.modalService.closeAll();
    }
    callEdition(category: ICategory) {
        this.categoryForm.controls['id'].setValue(category.id ? JSON.stringify(category.id) : '');
        this.categoryForm.controls['name'].setValue(category.name ? category.name : '');
        this.categoryForm.controls['description'].setValue(category.description ? category.description : '');
        this.modalService.displayModal('md', this.addCategoryModal);
    }

    updateCategory(category: ICategory) {
        this.categoryService.update(category);
        this.modalService.closeAll();
    }
}