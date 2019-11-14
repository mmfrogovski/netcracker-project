import {Subscription} from "rxjs";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Service} from "../../../models/service";
import {AllServicesService} from "../../../services/all-services/all-services.service";

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit, OnDestroy {

  public service: Service;
  public checkoutForm;

  public isPopup: boolean = false;

  public urlBck: string;

  public services: Service[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private allServicesService: AllServicesService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loadServices();
    this.checkoutForm = this.formBuilder.group({
      serviceName: new FormControl('', [
        Validators.required
      ]),
      subName:  new FormControl('', [
        Validators.required
      ]),
      price:  new FormControl('', [
        Validators.required
      ]),
      description:  new FormControl('', [
        Validators.required
      ]),
      image: new FormControl('', [
        Validators.required
      ])
    })
  }


  public formAction():void {
    this.isPopup=!this.isPopup;
  }

  private loadServices() {
    this.subscriptions.push(this.allServicesService.getServices().subscribe(services => {
      this.services = services;
    }));
  }

  public onSubmit(data) : void {
    this.sendService(data);
    this.checkoutForm.reset();
  }

  sendService(service) {
    this.services.push(service);

    this.subscriptions.push(this.allServicesService.saveService(service).subscribe(res => {
    }))
  }

  deleteService(item) {
    this.subscriptions.push(this.allServicesService.deleteService(item.id).subscribe(() => {
      this.loadServices();
    }));
    this.services.slice(item);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
