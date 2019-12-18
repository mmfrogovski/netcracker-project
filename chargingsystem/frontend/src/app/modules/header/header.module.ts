import {AllServicesViewComponent} from "../layout/components/all-services/all-services.component";
import {NgModule} from "@angular/core";
import {HeaderComponent} from "./components/header.component";


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [

  ],
  providers: [],
  exports: [HeaderComponent]
})
export class HeaderModule {}
