import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {AuthToken, UsersServiceService} from "../../../services/users-service/users-service.service";
import {Subscription} from "rxjs";
import {StorageService} from "../../../services/storage-service/storage-service";
import {ToastrService} from "ngx-toastr";
import {EventService} from "../../../services/eventService/event.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isPopup: boolean = false;
  public checkoutForm;
  public user: User;
  public isLoggedIn: boolean = false;
  public wrong: boolean = false;
  public page: string;

  private subscriptions: Subscription[] = [];


  constructor(private formBuilder: FormBuilder,
              private usersService: UsersServiceService,
              private storageService: StorageService,
              private toastr: ToastrService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.onRegistrUser.subscribe(login => {
      this.logIn(login);
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
    this.usersService.generateToken(user)
      .subscribe((authToken: AuthToken) => {
        if (authToken.token) {
          this.isLoggedIn = true;
          this.isPopup = !this.isPopup;
          this.storageService.setToken(authToken.token);
          this.usersService.getAuthorizedUser()
            .subscribe((userModel: User) => {
              this.storageService.setCurrentUser(userModel);
            });
        }
      }, (error) => {
        if (error.status === 401) {
          this.toastr.info('Check your set data', 'Invalid login or password!')
        } else {
          this.toastr.error(error.message, 'Error!');
        }
      });
  }


  public showLogin(): void {
    this.isPopup = !this.isPopup;
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
