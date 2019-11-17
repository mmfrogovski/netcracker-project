  import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UsersServiceService} from "../../../services/users-service/users-service.service";
import {UserSub} from "../../../models/user-sub";
import {User} from "../../../models/user";

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit, OnDestroy {

  public myServices: UserSub[] = [];

  private subscriptions: Subscription[] = [];

  public user:User;

  constructor(private usersSubService: UsersServiceService) {
  }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('user'));
    this.loadSubscriptions();
  }

  private loadSubscriptions() {
    this.subscriptions.push(this.usersSubService.getUserSubscriptionById(this.user.customer.id).subscribe(services => {
      this.myServices = services;
    }));
  }

  updateResources(){
    this.subscriptions.push(this.usersSubService.setBillingAccountResources(50, this.user.customer.billingAccount).subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
