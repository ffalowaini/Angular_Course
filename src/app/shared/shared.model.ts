import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthComponent } from "../auth/auth/auth.component";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { PlaceholderDirective } from "./placeholder.directive";

@NgModule({
    declarations: [

        DropdownDirective,
        
        AlertComponent,
        PlaceholderDirective,
    ],
    imports: [CommonModule],
    exports: [


        DropdownDirective,
        AlertComponent,
        PlaceholderDirective,
        CommonModule,
    ],

})
export class SharedModel {

}