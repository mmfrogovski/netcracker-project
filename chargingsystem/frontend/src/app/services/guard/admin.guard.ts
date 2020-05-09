import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {StorageService} from "../storage-service/storage-service";

@Injectable({
  providedIn:'root'
})
export class AdminGuard implements CanActivate {

  constructor(private strorageService: StorageService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    if (this.strorageService.getCurrentUser().role) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }

}
