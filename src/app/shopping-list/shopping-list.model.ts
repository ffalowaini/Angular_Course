import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { SharedModel } from "../shared/shared.model";



@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        SharedModel,
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent },
        ]),
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class ShoppingListModel {

}