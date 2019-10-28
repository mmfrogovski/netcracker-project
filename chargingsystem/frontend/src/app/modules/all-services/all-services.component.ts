import {Service} from "../../models/service";
import {AllServicesService} from "../../services/all-services/all-services.service";
import {Subscription} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {Component, OnDestroy, OnInit} from "@angular/core";

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit, OnDestroy {

  service: Service;
  checkoutForm;

  services: Service[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private allServicesService: AllServicesService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loadServices();
    this.checkoutForm = this.formBuilder.group({
      serviceName: '',
      subName: '',
      subDuration: '',
      price: '',
      description: ''
    })
  }


  addServiceForm() {
    document.querySelector(".add_service_form").id = "add_show";

  }


  closeForm() {
    document.querySelector(".add_service_form").id = "";
  }


  private loadServices() {
    this.subscriptions.push(this.allServicesService.getServices().subscribe(services => {
      this.services = services;
    }));
  }

  onSubmit(data) {
    this.sendService(data);
    this.checkoutForm.reset();
  }

  sendService(service) {
    this.services.push(service);
    this.subscriptions.push(this.allServicesService.saveService(service).subscribe(res => {
      console.log(res);
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
