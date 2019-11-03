import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router";

import {AllServicesViewComponent} from "./components/all-services/all-services.component";
import {FooterComponent} from "../footer/footer.component";
import {NgModule} from "@angular/core";
import {HeaderComponent} from "../header/components/header.component";
import {StartComponent} from "../start-page/components/start.component";
import {ServiceDetailsComponent} from "../service-details/components/service-details.component";

@NgModule({
  declarations: [
    HeaderComponent,
    StartComponent,
    AllServicesViewComponent,
    FooterComponent,
    ServiceDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
