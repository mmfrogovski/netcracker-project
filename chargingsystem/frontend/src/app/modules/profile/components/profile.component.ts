import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserSub} from "../../../models/user-sub";
import {Subscription} from "rxjs";
import {User} from "../../../models/user";
import {UsersServiceService} from "../../../services/users-service/users-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {


  public myServices: UserSub[] = [];

  private subscriptions: Subscription[] = [];

  public user: User;

  public numberOfSubs: number;

  public resources: number;

  constructor(private usersSubService: UsersServiceService,
              private usersServicesService: UsersServiceService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.subscriptions.push(this.usersServicesService.getBillingAccountById(this.user.customer.billingAccount.id).subscribe(res => {
        this.resources = res.resources;
      }
    ));
    this.loadSubscriptions();
  }

  private loadSubscriptions() {
    this.subscriptions.push(this.usersSubService.getUserSubscriptionById(this.user.customer.id).subscribe(services => {
      this.myServices = services;
      this.numberOfSubs = this.myServices.length;
    }));
  }

  updateResources() {
    this.subscriptions.push(this.usersSubService.setBillingAccountResources(50, this.user.customer.billingAccount).subscribe());
    alert("resources updated");
  }

  public unpauseService(sub){
    this.subscriptions.push(this.usersServicesService.setUserSubscriptionActive(sub, true).subscribe(res=>{}));
    alert("status updated");
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


}
