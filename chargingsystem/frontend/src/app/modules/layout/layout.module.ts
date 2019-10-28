import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {StartComponent} from "../start-page/start.component";
import {AllServicesViewComponent} from "./components/all-services/all-services.component";
import {FooterComponent} from "../footer/footer.component";
import {NgModule} from "@angular/core";
import {ServiceDetailsComponent} from "../service-details/service-details.component";

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
