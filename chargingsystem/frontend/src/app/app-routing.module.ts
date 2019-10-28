import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./modules/layout/components/home/home.component";
import {AllServicesViewComponent} from "./modules/layout/components/all-services/all-services.component";
import {NgModule} from "@angular/core";
import {ServiceDetailsComponent} from "./modules/service-details/service-details.component";


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "all-services", component: AllServicesViewComponent},
  {path: "service-details/:id", component: ServiceDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
