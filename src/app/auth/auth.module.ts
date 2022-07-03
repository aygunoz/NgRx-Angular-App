import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [SharedModule, RouterModule.forChild([{path: '', component: AuthComponent}]), FormsModule]
})
export class AuthModule {
}
