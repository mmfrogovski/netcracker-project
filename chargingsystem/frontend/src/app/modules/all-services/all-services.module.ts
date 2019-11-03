import {AllServicesViewComponent} from "../layout/components/all-services/all-services.component";
import {FooterComponent} from "../footer/footer.component";
import {NgModule} from "@angular/core";
import {HeaderComponent} from "../header/components/header.component";
import {StartComponent} from "../start-page/components/start.component";


@NgModule({
  declarations: [
    HeaderComponent,
    StartComponent,
    AllServicesViewComponent,
    FooterComponent
  ],
  imports: [

  ],
  providers: [],
  exports: [HeaderComponent]
})
export class HeaderModule {}
