import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isPopup: boolean = false;
  public checkoutForm;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\\d$@$!%*?&].{8,}')
      ])

  })
  }

  public onSubmit(data) : void {
    this.logIn(data);
    this.checkoutForm.reset();
  }

  public logIn(user): boolean{
    //check user
    return false;
  }

  public showLogin(): void{
    this.isPopup=!this.isPopup;
  }

}
