import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {UsersServiceService} from "../../../services/users-service/users-service.service";
import {Subscription} from "rxjs";

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

  private subscriptions: Subscription[] = [];


  constructor(private formBuilder: FormBuilder,
              private usersService: UsersServiceService) {
  }

  ngOnInit() {
    this.checkLogged();
    this.checkoutForm = this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9_]{1,15}$")
      ]),
      password: new FormControl('', [
        Validators.required
      ])

    })
  }

  public checkLogged(): void {
    if (localStorage.getItem('user') != null)
      this.isLoggedIn = true;
  }

  public onSubmit(data): void {
    this.logIn(data);
    this.checkoutForm.reset();
  }

  public logOut(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    location.replace('http://localhost:4200/');
  }

  public logIn(user): void {
    this.subscriptions.push(this.usersService.getUserByLoginAndPassword(user.login, user.password).subscribe(res => {
      this.user = res;
      if (this.user.login) {
        localStorage.setItem('user', JSON.stringify(this.user));
        this.isLoggedIn = true;
        this.isPopup = false;
      } else {
        this.wrong = true;
      }
    }));

  }


  public showLogin(): void {
    this.isPopup = !this.isPopup;
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
