import {NgModule} from "@angular/core";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/components/header.component";
import {AppRoutingModule} from "../../app-routing.module";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule

  ],
  providers: [],
  exports: []
})
export class HeaderModule {}
