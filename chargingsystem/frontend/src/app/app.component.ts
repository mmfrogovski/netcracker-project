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
    if (this.user) {
      this.setIntrvl();
    }
  }

  public setUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public checkSubscriptions(): void {
    this.usersService.getUserSubscriptionById(this.user.customer.id).subscribe(res => {
      this.userSubs = res;
      this.userSubs.forEach(sub => {
        if (sub.active == false) {
          this.sendNotification();
          console.log(this.userSubs);
          this.removePausedSub(sub);
        }
      })
    })
  }

  removePausedSub = (pausedSub: UserSub): void => {
    this.userSubs = this.userSubs.filter(sub => sub.id == 18);
  };

  public sendNotification() {
    //Service ... is paused.
  }

  public setIntrvl(): void {
    setInterval(() => this.checkSubscriptions(), 5000);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  title = 'frontend';
}
