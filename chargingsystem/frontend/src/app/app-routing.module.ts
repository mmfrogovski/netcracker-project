import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./modules/layout/components/home/home.component";
import {AllServicesViewComponent} from "./modules/layout/components/all-services/all-services.component";
import {NgModule} from "@angular/core";
import {ServiceDetailsComponent} from "./modules/service-details/components/service-details.component";
import {MyServicesComponent} from "./modules/my-services/components/my-services.component";


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "all-services", component: AllServicesViewComponent},
  {path: "service-details/:id", component: ServiceDetailsComponent},
  {path: "my-services", component: MyServicesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
