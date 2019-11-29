import {Subscription} from "rxjs";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Service} from "../../../models/service";
import {AllServicesService} from "../../../services/all-services/all-services.service";
import {User} from "../../../models/user";
import {StorageService} from "../../../services/storage-service/storage-service";

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit, OnDestroy {

  public service: Service;
  public checkoutForm;
  public isPopup: boolean = false;
  public user:User;

  public config: any;

  public services: Service[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private allServicesService: AllServicesService,
              private formBuilder: FormBuilder,
              private storageService: StorageService) {
    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      totalItems: 8
    };
  }

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();
    this.loadFirstPage();
    this.checkoutForm = this.formBuilder.group({
      serviceName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
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
    this.subscriptions.push(this.allServicesService.getServicePage(parseFloat(event) - 1, 4).subscribe(
      res => {
        this.services = res.content;
      }
    ));
  }


  public formAction(): void {
    this.isPopup = !this.isPopup;
  }

  private loadFirstPage() {
    this.subscriptions.push(this.allServicesService.getServicePage(0, 4).subscribe(page => {
      this.services = page.content;
      this.config.totalItems = page.totalElements;
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
