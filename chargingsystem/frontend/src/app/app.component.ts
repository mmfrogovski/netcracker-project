import {Component, OnDestroy, OnInit} from "@angular/core";
import {User} from "./models/user";
import {Subscription} from "rxjs";
import {UsersServiceService} from "./services/users-service/users-service.service";
import {UserSub} from "./models/user-sub";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  private subscriptions: Subscription[] = [];

  setInterval = setInterval;


  constructor(private usersService: UsersServiceService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.usersService.getUsers().subscribe(res => {
      this.users = res;
    }));
    this.setIntrvl();
  }

  public subSumOfPrice(user_subs: UserSub[]): number {
    let sum: number = 0;
    user_subs.forEach(sub => {
      sum += sub.subscription.price;
    });
    return sum;
  }


  //Not correct
  public checkSubscriptions(): void {
    this.users.forEach(user => {
      let user_subs: UserSub[] = [];
      this.usersService.getUserSubscriptionById(user.id).subscribe(res => {
          user_subs = res;
        let sumOfSubs: number = this.subSumOfPrice(user_subs);
        if (sumOfSubs < user.customer.billingAccount.resources) {
          let newResources: number = user.customer.billingAccount.resources - this.subSumOfPrice(user_subs);
          this.usersService.setBillingAccountResources(newResources, user.customer.billingAccount).subscribe();
          console.log(user.customer.billingAccount.resources);
          if (newResources < sumOfSubs) {
            // while (newResources - sumOfSubs < 0) {
            //   // this.usersService.disableSubscription(user_subs[user_subs.length])
            //
            // }
            this.sendNotification();
          }
        }
        }
      );

    })
  }

  public sendNotification() {
    //Service ... is paused.
  }

  public setIntrvl(): void {
    setInterval(() => this.checkSubscriptions(), 2000);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  title = 'frontend';
}
