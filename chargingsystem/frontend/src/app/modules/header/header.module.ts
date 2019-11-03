import {AllServicesViewComponent} from "../layout/components/all-services/all-services.component";
import {NgModule} from "@angular/core";
import {HeaderComponent} from "./components/header.component";
import {StartComponent} from "../start-page/components/start.component";


@NgModule({
  declarations: [
    HeaderComponent,
    StartComponent,
    AllServicesViewComponent
  ],
  imports: [

  ],
  providers: [],
  exports: [HeaderComponent]
})
export class HeaderModule {}
