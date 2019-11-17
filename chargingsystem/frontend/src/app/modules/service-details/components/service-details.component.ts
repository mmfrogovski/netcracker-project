import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {Subscription} from "rxjs";
import {Service} from "../../../models/service";
import {UserSub} from "../../../models/user-sub";
import {Review} from "../../../models/review";
import {ReviewsService} from "../../../services/reviews-service/reviews.service";
import {UsersServiceService} from "../../../services/users-service/users-service.service";
import {AllServicesService} from "../../../services/all-services/all-services.service";
import {Customer} from "../../../models/customer";
import {FormBuilder} from "@angular/forms";
import {User} from "../../../models/user";

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit, OnDestroy {

  public addReviewPopup: boolean = false;
  public service: Service = new Service();
  private subscriptions: Subscription[] = [];
  public newSubscription: UserSub = new UserSub();
  public customer: Customer;
  public date: Date = new Date();
  public reviews: Review[] = [];
  public serviceId: number;
  public checkoutForm;
  public user: User;
  public subscribed: boolean = true;


  constructor(private activatedRoute: ActivatedRoute,
              private allServicesService: AllServicesService,
              private usersServicesService: UsersServiceService,
              private reviewsService: ReviewsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loadService();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.subscribedCheck();
    this.loadReviews();
    this.checkoutForm = this.formBuilder.group({
      review: '',
      reviewDate: this.date.getDate() + ' ' + this.date.getMonth() + ' ' + this.date.getFullYear(),
      customer: {id: this.user.customer.id},
      subscription: {id: this.serviceId}
    })
  }

  private loadService(): void {
    this.serviceId = parseFloat(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.push(this.allServicesService.getServiceById(this.serviceId).subscribe(service => {
      this.service = service;
    }));
  }

  public onSubmit(data): void {
    data.customerId = this.user.customer.id;
    this.addReview(data);
    this.checkoutForm.reset();
  }

  private loadReviews(): void {
    this.subscriptions.push(this.reviewsService.getReviews(this.serviceId).subscribe(reviews => {
      this.reviews = reviews;
    }));
  }

  public addReviewShow(): void {
    this.addReviewPopup = !this.addReviewPopup;
  }

  public subscribedCheck(): void {
    this.subscriptions.push(this.usersServicesService.getSubscriptionByCustomerAndServiceId(this.user.customer.id, this.serviceId).subscribe(res => {
      if (res != null) {
        this.subscribed = false;
      }
    }))
  }

  public addReview(review): void {
    this.subscriptions.push(this.reviewsService.saveReview(review).subscribe(res => {
    }));
  }

  subscribeToService(): void {
    this.newSubscription.customer = this.user.customer;
    this.newSubscription.subscription = this.service;
    this.newSubscription.active = true;
    this.newSubscription.discount = 0;
    this.newSubscription.subStart = this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDate();
    this.newSubscription.subDuration = 0;
    this.subscriptions.push(this.usersServicesService.saveUserSub(this.newSubscription).subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
