
import {AllServicesViewComponent} from "../layout/components/all-services/all-services.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {NgModule} from "@angular/core";


@NgModule({
  declarations: [
    HeaderComponent,
    AllServicesViewComponent,
    FooterComponent
  ],
  imports: [

  ],
  providers: [],
  exports: [HeaderComponent]
})
export class HeaderModule {}
