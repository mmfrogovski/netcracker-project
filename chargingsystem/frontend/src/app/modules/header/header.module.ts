import { NgModule } from "@angular/core";
import {HeaderComponent} from "./header.component";
import {StartComponent} from "../start-page/start.component";
import {AllServicesViewComponent} from "../layout/components/all-services/all-services.component";


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
