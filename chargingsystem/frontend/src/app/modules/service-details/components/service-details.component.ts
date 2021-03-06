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
import {FormBuilder, FormControl, Validators} from "@angular/forms";
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
  private userSub: UserSub;
  public reviews: Review[] = [];
  public serviceId: number;
  public checkoutForm;
  public user: User;
  public subscribed: boolean = false;

  public base64Image: string;

  public isEdit: boolean = false;

  public checkoutServiceForm;

  constructor(private activatedRoute: ActivatedRoute,
              private allServicesService: AllServicesService,
              private usersServicesService: UsersServiceService,
              private reviewsService: ReviewsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loadService();
    if (JSON.parse(localStorage.getItem('user'))) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.subscribedCheck();
    }
    this.loadReviews();
    this.checkoutForm = this.formBuilder.group({
      review: new FormControl('',
        [Validators.required,
          Validators.maxLength(255)]),
      reviewDate: this.date.getDate() + ' ' + this.date.getMonth() + ' ' + this.date.getFullYear(),
      customer: {id: this.user.customer.id},
      subscription: {id: this.serviceId}
    });

    this.checkoutServiceForm = this.formBuilder.group({
      serviceName: new FormControl('', [
        Validators.maxLength(255)
      ]),
      subName: new FormControl('', [
      ]),
      price: new FormControl('', [
        Validators.min(4)
      ]),
      description: new FormControl('', [
      ]),
      tags: new FormControl('', [
      ]),
      image: new FormControl('', [
      ])
    })
  }

  private loadService(): void {
    this.serviceId = parseFloat(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.push(this.allServicesService.getServiceById(this.serviceId).subscribe(service => {
      this.service = service;
    }));
  }

  public onSubmit(data): void {
    data.customer = this.user.customer;
    this.addReview(data);
    this.reviews.push(data);
    this.addReviewPopup = false;
    this.checkoutForm.reset();
  }


  private loadReviews(): void {
    this.subscriptions.push(this.reviewsService.getReviews(this.serviceId).subscribe(reviews => {
      this.reviews = reviews;
    }));
  }

  public addReviewShow(): void {
    if (this.user != null)
      this.addReviewPopup = !this.addReviewPopup;
  }


  public onSubmitValue(data): void {
    if (data.serviceName != "") {
      this.service.serviceName = data.serviceName;
    }
    if (data.price != "") {
      this.service.price = data.price;
    }
    if (data.description != "") {
      this.service.description = data.description;
    }
    if (data.image != "") {
      this.service.image = this.base64Image;
    }
    if (data.subName != "") {
      this.service.subName = data.subName;
    }
    if(data.tags != ""){
      this.service.tags = data.tags;
    }
    this.editService(this.service);
    this.checkoutForm.reset();
  }

  public editService(service: Service): void {
    this.subscriptions.push(this.allServicesService.editService(service).subscribe(res => {
      this.service = res;
    }));
    this.base64Image = "";
    this.isEdit = false;
  }

  public subscribedCheck(): void {
    this.subscriptions.push(this.usersServicesService.getSubscriptionByCustomerAndServiceId(this.user.customer.id, this.serviceId).subscribe(res => {
      if (res != null) {
        this.subscribed = true;
        this.userSub = res;
      }
    }))
  }

  public handleFileSelect(evt): void {
    let files = evt.target.files;
    let file = files[0];

    if (files && file) {
      let reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  public handleReaderLoaded(readerEvt): void {
    let binaryString = readerEvt.target.result;
    this.base64Image = btoa(binaryString);
  }

  public addReview(review): void {
    this.subscriptions.push(this.reviewsService.saveReview(review).subscribe(() => {
    }));
  }

  public subscribeToService(): void {
    this.subscribed = true;
    this.newSubscription.customer = this.user.customer;
    this.newSubscription.subscription = this.service;
    this.newSubscription.active = true;
    this.newSubscription.discount = 0;
    this.newSubscription.subStart = this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDate();
    this.newSubscription.subDuration = 0;
    this.subscriptions.push(this.usersServicesService.saveUserSub(this.newSubscription).subscribe());
  }

  public unsubscribeFromService(): void {
    this.subscriptions.push(this.usersServicesService.deleteUserSub(this.userSub.id).subscribe(() => {
      this.subscribed = false;
    }));
  }

  formAction() {
    this.isEdit = !this.isEdit;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
