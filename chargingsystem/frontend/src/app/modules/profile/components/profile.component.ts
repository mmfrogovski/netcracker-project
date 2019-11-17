import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserSub} from "../../../models/user-sub";
import {Subscription} from "rxjs";
import {User} from "../../../models/user";
import {UsersServiceService} from "../../../services/users-service/users-service.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

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

  public addResourcesPopup: boolean = false;

  public addResourcesForm;

  constructor(private usersSubService: UsersServiceService,
              private usersServicesService: UsersServiceService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
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


  public unpauseService(sub) {
    this.subscriptions.push(this.usersServicesService.setUserSubscriptionActive(sub, true).subscribe(res => {
    }));
    alert("status updated");
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


}
