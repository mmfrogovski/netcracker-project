import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {UsersServiceService} from "../../../services/users-service/users-service.service";
import {Subscription} from "rxjs";
import {StorageService} from "../../../services/storage-service/storage-service";
import {ToastrService} from "ngx-toastr";
import {EventService} from "../../../services/eventService/event.service";

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isPopup = false;
  public checkoutForm;
  public user: User;
  public isLoggedIn = false;
  public wrong = false;
  public page: string;

  private subscriptions: Subscription[] = [];


  constructor(private formBuilder: FormBuilder,
              private usersService: UsersServiceService,
              private storageService: StorageService,
              private toastr: ToastrService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.onRegistrUser.subscribe(() => {
      this.checkLogged();
    });
    this.addClassActive();
    this.checkLogged();
    this.checkoutForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9_]{1,15}$")
      ]),
      password: new FormControl('', [
        Validators.required
      ])

    })
  }

  public addClassActive(): void {
    this.page = document.URL;
  }

  public checkLogged(): void {
    if (this.storageService.getCurrentUser() != null)
      this.isLoggedIn = true;
  }


  public onSubmit(data): void {
    this.logIn(data);
    this.checkoutForm.reset();
  }

  public logOut(): void {
    window.location.replace('http://localhost:4200/');
    this.storageService.clearToken();
    this.storageService.setCurrentUser(null);
    this.isLoggedIn = false;
  }

  public logIn(user): void {
    this.usersService.logIn(user);
    this.checkLogged();
    this.isPopup!=this.isPopup;
  }


  public showLogin(): void {
    this.isPopup = !this.isPopup;
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
