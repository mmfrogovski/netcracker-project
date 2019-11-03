
import {AllServicesViewComponent} from "../layout/components/all-services/all-services.component";
import {FooterComponent} from "../footer/footer.component";
import {NgModule} from "@angular/core";
import {HeaderComponent} from "../header/components/header.component";


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
