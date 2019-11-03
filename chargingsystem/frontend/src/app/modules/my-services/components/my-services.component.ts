import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UsersServiceService} from "../../../services/users-service/users-service.service";
import {UserSub} from "../../../models/user-sub";

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit, OnDestroy {

  public myServices: UserSub[] = [];

  private subscriptions: Subscription[] = [];


  constructor(private usersSubService: UsersServiceService) {
  }

  ngOnInit() {
    this.loadSubscriptions();
  }

  private loadSubscriptions() {
    this.subscriptions.push(this.usersSubService.getUserSubscriptionById(1).subscribe(services => {
      this.myServices = services;
    }));
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
