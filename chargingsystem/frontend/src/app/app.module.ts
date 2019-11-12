import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from "./modules/layout/components/home/home.component";
import {AllServicesViewComponent} from "./modules/layout/components/all-services/all-services.component";
import {FooterComponent} from './modules/footer/footer.component';
import {PlaceComponent} from "./modules/place/place.component";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BackendUrlsConst} from "./services/const-service/backend-urls.const";
import { MyServicesComponent } from './modules/my-services/components/my-services.component';
import {StartComponent} from "./modules/start-page/components/start.component";
import {AllServicesComponent} from "./modules/all-services/components/all-services.component";
import {HeaderComponent} from "./modules/header/components/header.component";
import {ServiceDetailsComponent} from "./modules/service-details/components/service-details.component";
import {RegistrationComponent} from "./modules/registration/components/registration.component";
import { ProfileComponent } from './modules/profile/components/profile.component';

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
    MyServicesComponent,
    RegistrationComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [BackendUrlsConst],
  bootstrap: [AppComponent]
})
export class AppModule {
}
