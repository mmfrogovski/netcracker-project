import { NgModule } from "@angular/core";
import {StartComponent} from "../start-page/start.component";
import {AllServicesViewComponent} from "../layout/components/all-services/all-services.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";


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
