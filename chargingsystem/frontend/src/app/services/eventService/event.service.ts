import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {UserSub} from "../../models/user-sub";
import {LoginModel} from "../../models/login-model";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  public onUpdatePrice: Subject<number> = new Subject<number>();

  public onUpdateServiceStatus: Subject<UserSub[]> = new Subject<UserSub[]>();

  public onRegistrUser: Subject<LoginModel> = new Subject<LoginModel>();

  public updatePrice(price: number): void {
    this.onUpdatePrice.next(price);
  }

  public updateUserServicesStatus(services: UserSub[]): void {
    this.onUpdateServiceStatus.next(services);
  }

  public registrUser(login: LoginModel): void {
    this.onRegistrUser.next(login);
  }
}
