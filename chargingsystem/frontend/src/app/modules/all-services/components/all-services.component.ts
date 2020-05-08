import {Subscription} from "rxjs";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Service} from "../../../models/service";
import {AllServicesService} from "../../../services/all-services/all-services.service";
import {User} from "../../../models/user";
import {StorageService} from "../../../services/storage-service/storage-service";
import {ActivatedRoute} from "@angular/router";

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
  public date: Date = new Date();
  public search: string = "";
  public notFound: boolean = false;
  public numberOfServiceSubscriptions: number[] = [];
  public services: Service[] = [];
  private subscriptions: Subscription[] = [];
  public pageNum: number = 1;
  public isItemsPerPage: boolean = false;
  public itemsPP: number = 4;

  constructor(private allServicesService: AllServicesService,
              private formBuilder: FormBuilder,
              private storageService: StorageService,
              private route: ActivatedRoute) {
    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      totalItems: 8
    };
  }

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();
    this.search = this.route.snapshot.paramMap.get('search');
    this.loadPage(0, 4);
    this.getNumberOfServiceSub();
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
      tags: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      image: new FormControl('', [
        Validators.required
      ])
    })
  }

  public pageChanged(event): void {
    this.config.currentPage = event;
    this.subscriptions.push(this.allServicesService.getServicePage(parseFloat(event) - 1, this.config.itemsPerPage).subscribe(
      res => {
        this.services = res.content;
        this.pageNum = parseFloat(this.config.currentPage);
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
    if (this.search == null) {
      this.subscriptions.push(this.allServicesService.getServicePage(page, size).subscribe(page => {
        this.services = page.content;
        this.config.totalItems = page.totalElements;
      }));
    } else {
      this.loadServicesByTags(this.search);
    }
  }

  public onSubmit(data): void {
    this.sendService(data);
    this.checkoutForm.reset();
  }

  public sendService(service: Service): void {
    service.image = this.base64Image;
    this.subscriptions.push(this.allServicesService.saveService(service).subscribe(res => {
      if (this.config.currentPage >= (this.config.totalItems / this.config.itemsPerPage)) {
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


  public getNumberOfServiceSub(): void {
    this.allServicesService.getNumberOfServiceSubscriptions().subscribe(res => {
      this.numberOfServiceSubscriptions = res;
    });

  }

  public loadServicesByTags(tags: string) {
    this.allServicesService.getServicesByTags(tags).subscribe(res => {
      this.services = res;
      this.notFound = res[0] == undefined;
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  isItemsPerPageShow() {
    this.isItemsPerPage = !this.isItemsPerPage;
  }

  changeConfig(itemsPerPage: number) {
    this.config.itemsPerPage = itemsPerPage;
    this.itemsPP = itemsPerPage;
    this.loadPage(0, this.config.itemsPerPage);
  }
}
