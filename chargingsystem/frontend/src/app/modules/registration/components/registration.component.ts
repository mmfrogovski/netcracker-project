import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UsersServiceService} from "../../../services/users-service/users-service.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RegistrationData} from "../../../models/registr";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public checkoutForm;
  private subscriptions: Subscription[] = [];


  constructor(private usersService: UsersServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16)
        ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      age:new FormControl('', [
        Validators.required
      ]),
      role: 0,
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\\d$@$!%*?&].{8,}')
      ]),
      confirm_password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\\d$@$!%*?&].{8,}')
      ])
    })
  }

  public onSubmit(data) : void {
    this.addUser(data);
    this.checkoutForm.reset();
  }

  private addUser(user: RegistrationData):void{
    this.subscriptions.push(this.usersService.registUser(user).subscribe(res=>{}))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
