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
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_]{1,15}$')
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z]{1,50}$')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      age: new FormControl('', [
        Validators.required
      ]),
      role: 0,
      password: new FormControl('', [
        Validators.required,
        Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$")
      ]),
      confirm_password: new FormControl('', [
        Validators.required,
        this.matchOtherValidator('password')
      ])
    })
  }

  public onSubmit(data): void {
    this.addUser(data);
    this.checkoutForm.reset();
  }

  private addUser(user: RegistrationData): void {
    this.subscriptions.push(this.usersService.registUser(user).subscribe(() => {
      window.location.replace('http://localhost:4200/');
    }));
  }

  matchOtherValidator(otherControlName: string) {

    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate(control: FormControl) {

      if (!control.parent) {
        return null;
      }

      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }

      if (!otherControl) {
        return null;
      }

      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true
        };
      }

      return null;

    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
