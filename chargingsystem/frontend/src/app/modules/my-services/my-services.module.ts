import {NgModule} from "@angular/core";
import {HeaderComponent} from "../header/components/header.component";
import {FooterComponent} from "../footer/footer.component";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [

  ],
  providers: [],
  exports: [HeaderComponent]
})
export class MyServicesModule {}
