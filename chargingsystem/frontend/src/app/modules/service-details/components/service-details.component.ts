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
  public date = Date.now();
  public reviews: Review[] = [];
  public serviceId: number;
  public checkoutForm;


  constructor(private activatedRoute: ActivatedRoute,
              private allServicesService: AllServicesService,
              private usersServicesService: UsersServiceService,
              private reviewsService: ReviewsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.serviceId = parseFloat(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadService();
    this.loadReviews();
    this.checkoutForm = this.formBuilder.group({
      review: '',
      reviewDate: '',
      customer:{id:1},
      subscription:{id: this.serviceId}
    })
  }

  private loadService(): void {
    this.subscriptions.push(this.allServicesService.getServiceById(this.serviceId).subscribe(service => {
      this.service = service;
    }));
  }

  public onSubmit(data) : void {
    console.log(data);
    this.addReview(data);
    this.checkoutForm.reset();
  }

  private loadReviews(): void {
    this.subscriptions.push(this.reviewsService.getReviews(this.serviceId).subscribe(reviews => {
      this.reviews = reviews;
    }));
  }

  public addReviewShow(): void {
    this.addReviewPopup=!this.addReviewPopup;
  }

  public addReview(review):void{
    this.subscriptions.push(this.reviewsService.saveReview(review).subscribe(res=>{}));
  }

  subscribeToService():void {
    this.customer.id = 1;
    this.newSubscription.customer = this.customer;
    this.newSubscription.subscription = this.service;
    this.newSubscription.startSub = document.querySelector(".date").innerHTML;
    this.subscriptions.push(this.usersServicesService.saveUserSub(this.newSubscription).subscribe(res => {
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
