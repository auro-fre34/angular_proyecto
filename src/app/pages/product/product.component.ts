import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
    standalone: true,
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    imports: [
        CommonModule,
        LoaderComponent
    ]
})
export class ProductComponent {

}