import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserSub} from "../../../models/user-sub";
import {Subscription} from "rxjs";
import {User} from "../../../models/user";
import {UsersServiceService} from "../../../services/users-service/users-service.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {EventService} from "../../../services/eventService/event.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {


  public myServices: UserSub[] = [];

  private subscriptions: Subscription[] = [];

  public user: User;

  public pausedServices: UserSub[] = [];

  public numberOfSubs: number;

  public resources: number;

  public addResourcesPopup: boolean = false;

  public addResourcesForm;

  constructor(private usersSubService: UsersServiceService,
              private usersServicesService: UsersServiceService,
              private eventService: EventService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.eventService.onUpdatePrice.subscribe(value => this.resources = value);
    this.eventService.onUpdateServiceStatus.subscribe(value => {
      this.myServices = value;
    });
    this.addResourcesForm = this.formBuilder.group({
        resources: new FormControl('',
          [Validators.required,
            Validators.min(1),
            Validators.max(1000)
          ])
      }
    );

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


  public onSubmit(data): void {
    let res: number = parseFloat(data.resources);
    this.addResources(res);
    this.addResourcesForm.reset();
  }

  public addResources(value: number): void {
    this.subscriptions.push(this.usersSubService.setBillingAccountResources(this.resources + value, this.user.customer.billingAccount).subscribe());
    this.resources += value;
    this.addResourcesPopup = false;
  }

  public isResourcesPopup(): void {
    this.addResourcesPopup = !this.addResourcesPopup;
  }

  public unpauseService(sub: UserSub) {
    if (2*sub.subscription.price < this.resources) {
      this.subscriptions.push(this.usersServicesService.setUserSubscriptionActive(sub, true).subscribe(res => {
        this.subscriptions.push(this.usersSubService.getUserSubscriptionById(this.user.customer.id).subscribe(res => {
          this.eventService.updateUserServicesStatus(res);
        }));
      }));
    }else{
      alert("Can't unpause service due to low resources.")
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


}
