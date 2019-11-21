import {Component, OnDestroy, OnInit} from "@angular/core";
import {User} from "./models/user";
import {Subscription} from "rxjs";
import {UsersServiceService} from "./services/users-service/users-service.service";
import {UserSub} from "./models/user-sub";
import {EventService} from "./services/eventService/event.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private user: User;
  private userSubs: UserSub[] = [];
  private activeCount: number;


  setInterval = setInterval;


  constructor(private usersService: UsersServiceService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.setUser();
    if (this.user != null) {
      this.setIntrvl();
    }
  }

  public setUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.usersService.getUserSubscriptionById(this.user.customer.id).subscribe(res => {
      this.userSubs = res;
      res.forEach(sub => {
        if (sub.active == true) {
          this.activeCount++;
        }
      })
    }, error1 => {
    });
  }

  private checkMoney(): void {
    this.usersService.getBillingAccountById(this.user.customer.billingAccount.id).subscribe(res => {
      this.eventService.updatePrice(res.resources);
    });
  }

  private checkoutServiceStatus(): void {
    this.usersService.getUserSubscriptionById(this.user.customer.id).subscribe(res => {
      this.eventService.updateUserServicesStatus(res);
    });
  }

  public checkSubscriptions(): void {
    let count: number = this.userSubs.length;
    if (this.activeCount != 0) {
      this.userSubs.forEach(sub => {
        if (sub.active == false) {
          this.sendNotification("service" + sub.subscription.serviceName + "is paused");
          this.removePausedSub(sub);
        }
      });
      if (count == 0) {
        this.sendNotification("out of resources");
      }
    }
  }

  removePausedSub = (pausedSub: UserSub): void => {
    var unactiveSub = this.userSubs.find(sub => sub.id == pausedSub.id);
    this.userSubs.splice(this.userSubs.indexOf(unactiveSub), 1);
  };

  public sendNotification(massege): void {
    //Service ... is paused.
  }

  public setIntrvl(): void {
    setInterval(() => {
      this.checkSubscriptions();
      this.checkMoney();
      this.checkoutServiceStatus();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  title = 'frontend';
}
