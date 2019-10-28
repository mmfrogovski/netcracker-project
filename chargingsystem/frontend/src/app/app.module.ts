import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StartComponent} from './modules/start-page/start.component';
import {AllServicesComponent} from './modules/all-services/all-services.component';
import {HeaderComponent} from './modules/header/header.component';
import {HomeComponent} from "./modules/layout/components/home/home.component";
import {AllServicesViewComponent} from "./modules/layout/components/all-services/all-services.component";
import {FooterComponent} from './modules/footer/footer.component';
import {PlaceComponent} from "./modules/place/place.component";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ServiceDetailsComponent} from "./modules/service-details/service-details.component";

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    AllServicesComponent,
    HeaderComponent,
    HomeComponent,
    AllServicesViewComponent,
    FooterComponent,
    PlaceComponent,
    ServiceDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
