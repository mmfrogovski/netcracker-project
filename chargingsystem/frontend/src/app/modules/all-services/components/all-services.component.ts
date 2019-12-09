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
  public user: User;
  public base64Image: string;
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
    this.loadPage(0,4);
    this.checkoutForm = this.formBuilder.group({
      serviceName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      subName: new FormControl('', [
        Validators.required
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(4)
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      image: new FormControl('', [
        Validators.required
      ])
    })
  }

  public pageChanged(event): void {
    this.config.currentPage = event;
    this.subscriptions.push(this.allServicesService.getServicePage(parseFloat(event) - 1, 4).subscribe(
      res => {
        this.services = res.content;
      }
    ));
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

  public formAction(): void {
    this.isPopup = !this.isPopup;
  }

  private loadPage(page: number, size: number) {
    this.subscriptions.push(this.allServicesService.getServicePage(page, size).subscribe(page => {
      this.services = page.content;
      this.config.totalItems = page.totalElements;
    }));
  }

  public onSubmit(data): void {
    this.sendService(data);
    this.checkoutForm.reset();
  }

  public sendService(service: Service): void {
    service.image = this.base64Image;
    this.subscriptions.push(this.allServicesService.saveService(service).subscribe(() => {
      console.log(this.config.currentPage);
      console.log(this.config.totalItems/this.config.itemsPerPage);
      if(this.config.currentPage>=(this.config.totalItems/this.config.itemsPerPage)){
        this.services.push(service);
      }
    }));
    this.base64Image = "";
    this.isPopup = false;
  }

  public deleteService = (service: Service): void => {
    this.subscriptions.push(this.allServicesService.deleteService(service.id).subscribe(() => {
      var delService = this.services.find(s => s.id == service.id);
      this.services.splice(this.services.indexOf(delService), 1);
    }));
  };

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
