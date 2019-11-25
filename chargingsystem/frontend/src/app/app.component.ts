import {Component, OnDestroy, OnInit} from "@angular/core";
import {User} from "./models/user";
import {Subscription} from "rxjs";
import {UsersServiceService} from "./services/users-service/users-service.service";
import {UserSub} from "./models/user-sub";
import {EventService} from "./services/eventService/event.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private user: User;
  private userSubs: UserSub[] = [];
  private resourcesStatus: boolean = true;


  setInterval = setInterval;


  constructor(private usersService: UsersServiceService,
              private eventService: EventService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.eventService.onUpdatePrice.subscribe(value => {
      if (value > 5) {
        this.resourcesStatus = true;
      }
    });
    this.setUser();
    if (this.user != null) {
      this.setIntrvl();
    }
  }

  public setUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.usersService.getUserSubscriptionById(this.user.customer.id).subscribe(res => {
      res.forEach(sub => {
        this.userSubs.push(sub);
      })
    }, error1 => {
    });
  }

  private checkMoney(): void {
    this.usersService.getBillingAccountById(this.user.customer.billingAccount.id).subscribe(res => {
      if (this.resourcesStatus) {
        if (res.resources < 5) {
          this.toastr.info('Out of money!', 'Info!');
          this.resourcesStatus = false;
        }
      }
      this.eventService.updatePrice(res.resources);
    });
  }

  private checkoutServiceStatus(): void {
    this.usersService.getUserSubscriptionById(this.user.customer.id).subscribe(res => {
      this.eventService.updateUserServicesStatus(res);
    });
  }

  public checkSubscriptions(): void {
    this.userSubs.forEach(sub => {
      if (sub.active == false) {
        this.removePausedSub(sub);
      }
    });

  }

  removePausedSub = (pausedSub: UserSub): void => {
    var unactiveSub = this.userSubs.find(sub => sub.id == pausedSub.id);
    this.sendNotification("service" + pausedSub.subscription.serviceName + "is paused");
    this.userSubs.splice(this.userSubs.indexOf(unactiveSub), 1);
  };

  public sendNotification(message): void {
    this.toastr.info(message, 'Info!')
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
