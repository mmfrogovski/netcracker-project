import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AllServicesService} from "../../services/all-services/all-services.service";
import {Service} from "../../models/service";
import {Subscription} from "rxjs";
import {UsersServiceService} from "../../services/users-service/users-service.service";
import {NewUserSub} from "../../models/new-user-sub";

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit, OnDestroy {

  service:Service = new Service();
  private subscriptions: Subscription[] = [];
  newSubscription: NewUserSub = new NewUserSub();
  date=Date.now();

  constructor(private activatedRoute: ActivatedRoute,
              private allServicesService:AllServicesService,
              private usersServicesService:UsersServiceService) {
  }

  ngOnInit() {
    this.loadService();
  }

  private loadService(){
    this.subscriptions.push(this.allServicesService.getServiceById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(service=>{
      this.service=service;
    }));
  }


  subscribeToService(){
    this.newSubscription.serviceId = this.service.id;
    this.newSubscription.customerId=5;
    this.newSubscription.restOfSub=this.service.subDuration;
    this.newSubscription.startSub=document.querySelector(".date").innerHTML;
    this.subscriptions.push(this.usersServicesService.saveUserSub(this.newSubscription).subscribe(res=>{
      console.log(this.newSubscription);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
