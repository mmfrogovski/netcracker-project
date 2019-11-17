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

  private subscriptions: Subscription[] = [];
  private user: User;
  private userSubs: UserSub[] = [];

  setInterval = setInterval;


  constructor(private usersService: UsersServiceService) {
  }

  ngOnInit() {
    this.setUser();
    // if (this.user!=null) {
    //   this.setIntrvl();
    // }
  }

  public setUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  // public checkSubscriptions(): void {
  //   this.usersService.getUserSubscriptionById(this.user.customer.id).subscribe(res => {
  //     this.userSubs = res;
  //     this.userSubs.forEach(sub => {
  //       if (sub.active == false) {
  //         this.sendNotification();
  //         this.removePausedSub(sub);
  //       }
  //     });
  //   })
  // }
  //
  // removePausedSub = (pausedSub: UserSub): void => {
  //   var unactiveSub = this.userSubs.find(sub => sub.id == pausedSub.id);
  //   // console.log(this.userSubs.indexOf(unactiveSub));
  //   this.userSubs.slice(this.userSubs.indexOf(unactiveSub),1);
  //   // console.log(this.userSubs)
  // };
  //
  // public sendNotification() {
  //   //Service ... is paused.
  // }
  //
  // public setIntrvl(): void {
  //   setInterval(() => this.checkSubscriptions(), 5000);
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  title = 'frontend';
}
