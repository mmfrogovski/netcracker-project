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

  public config: any;
  // public collection = {count: 4, data: Service[]};

  public services: Service[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private allServicesService: AllServicesService,
              private formBuilder: FormBuilder) {
    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      totalItems: 5
    };
  }

  ngOnInit() {
    this.loadFirstPage();
    this.checkoutForm = this.formBuilder.group({
      serviceName: new FormControl('', [
        Validators.required
      ]),
      subName: new FormControl('', [
        Validators.required
      ]),
      price: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      image: new FormControl('', [
        Validators.required
      ])
    })
  }

  pageChanged(event) {
    this.config.currentPage = event;
    this.subscriptions.push(this.allServicesService.getServicePage(parseFloat(event) - 1).subscribe(
      res => {
        this.services = res;
      }
    ));
  }


  public formAction(): void {
    this.isPopup = !this.isPopup;
  }

  private loadFirstPage() {
    this.subscriptions.push(this.allServicesService.getServicePage(0).subscribe(services => {
      this.services = services;
    }));
  }

  public onSubmit(data): void {
    this.sendService(data);
    this.checkoutForm.reset();
  }

  sendService(service) {
    this.services.push(service);
    this.subscriptions.push(this.allServicesService.saveService(service).subscribe());
    this.isPopup = false;
  }

  deleteService(item) {
    this.subscriptions.push(this.allServicesService.deleteService(item.id).subscribe());
    this.services.slice(item);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
