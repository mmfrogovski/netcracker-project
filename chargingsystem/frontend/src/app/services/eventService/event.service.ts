import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Service} from "../../models/service";
import {UserSub} from "../../models/user-sub";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  public onUpdatePrice: Subject<number> = new Subject<number>();

  public onUpdateServiceStatus: Subject<UserSub[]> = new Subject<UserSub[]>();

  public updatePrice(price: number): void {
    this.onUpdatePrice.next(price);
  }

  public updateUserServicesStatus(services: UserSub[]): void {
    this.onUpdateServiceStatus.next(services);
  }
}
