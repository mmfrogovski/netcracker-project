import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./modules/layout/components/home/home.component";
import {AllServicesViewComponent} from "./modules/layout/components/all-services/all-services.component";
import {PlaceComponent} from "./modules/place/place.component";


const routes: Routes = [
  {path: "", component: PlaceComponent},
  {path: "home", component: HomeComponent},
  {path: "all-services", component: AllServicesViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
