import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserSub} from "../../../models/user-sub";
import {Subscription} from "rxjs";
import {User} from "../../../models/user";
import {UsersServiceService} from "../../../services/users-service/users-service.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {EventService} from "../../../services/eventService/event.service";
import {ToastrService} from "ngx-toastr";
import {StorageService} from "../../../services/storage-service/storage-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {


  public myServices: UserSub[] = [];

  private subscriptions: Subscription[] = [];

  public user: User;

  public numberOfSubs: number;

  public checkoutForm;

  public resources: number;

  public addResourcesPopup: boolean = false;

  public addResourcesForm;

  public base64Image: string;

  public isEdit: boolean = false;


  constructor(private usersSubService: UsersServiceService,
              private usersServicesService: UsersServiceService,
              private eventService: EventService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private localStorage: StorageService) {
  }

  ngOnInit() {
    this.eventService.onUpdatePrice.subscribe(value => {
      this.resources = value;
    }, error => {
      console.log("error");
    });
    this.eventService.onUpdateServiceStatus.subscribe(value => {
      this.myServices = value;
    });
    this.addResourcesForm = this.formBuilder.group({
        resources: new FormControl('',
          [Validators.required,
            Validators.min(1),
            Validators.max(1000)
          ])
      }
    );

    this.checkoutForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.min(4)
      ]),
      email: new FormControl('', []),
      image: new FormControl('', [])
    });

    this.user = JSON.parse(localStorage.getItem('user'));
    this.subscriptions.push(this.usersServicesService.getBillingAccountById(this.user.customer.billingAccount.id).subscribe(res => {
        this.resources = res.resources;
      }
    ));
    this.loadSubscriptions();
  }

  private loadSubscriptions() {
    this.subscriptions.push(this.usersSubService.getUserSubscriptionById(this.user.customer.id).subscribe(services => {
      this.myServices = services;
      this.numberOfSubs = this.myServices.length;
    }));
  }

  public editProfile() {
    this.isEdit = true;
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

  public onSubmit(data): void {
    let res: number = parseFloat(data.resources);
    this.addResources(res);
    this.addResourcesForm.reset();
  }

  public onSubmitValue(data): void {
    if (data.name != "") {
      this.user.customer.name = data.name;
    }
    if (data.email != "") {
      this.user.customer.email = data.email;
    }
    if (data.avatar != "") {
     this.user.customer.avatar = data.image ;
    }
    this.sendCustomer(this.user.customer);
    this.checkoutForm.reset();
  }

  public sendCustomer(data): void {
    this.user.customer.avatar = this.base64Image;
    this.user.customer.name = data.name;
    this.user.customer.email = data.email;
    this.user.customer.billingAccount.resources = this.resources;
    this.subscriptions.push(this.usersServicesService.saveUser(this.user.customer).subscribe(res => {
        this.localStorage.setCurrentUser(this.user);
      }
    ));
    this.base64Image = "";
    this.isEdit = false;
  }

  public addResources(value: number): void {
    this.subscriptions.push(this.usersSubService
      .setBillingAccountResources(this.resources + value, this.user.customer.billingAccount)
      .subscribe(() => {
          this.toastr.success('Resources was successfully added!', 'Success!');
          this.user.customer.billingAccount.resources = this.resources + value;
          this.localStorage.setCurrentUser(this.user);
        },
        err => {
          this.toastr.error(err, 'Error!')
        }));
    this.resources += value;
    this.eventService.updatePrice(this.resources);
    this.addResourcesPopup = false;
  }

  public isResourcesPopup(): void {
    this.addResourcesPopup = !this.addResourcesPopup;
  }

  public unpauseService(sub: UserSub) {
    if (sub.subscription.price < this.resources) {
      this.subscriptions.push(this.usersServicesService.setUserSubscriptionActive(sub, true).subscribe(res => {
        this.subscriptions.push(this.usersSubService.getUserSubscriptionById(this.user.customer.id).subscribe(res => {
          this.myServices = res;
          this.toastr.success('Service unpaused!', 'Success!')
        }, err => {
          console.log('UNPAUSE SERVICE ERROR: ' + err);
        }));
      }));
    } else {
      this.toastr.error("Can't unpause service due to low resources.", 'Error!');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  formAction() {
    this.isEdit = false;
  }
}
