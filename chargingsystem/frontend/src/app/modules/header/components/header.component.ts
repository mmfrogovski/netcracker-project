import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isPopup: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public showLogin(): void{
    this.isPopup=!this.isPopup;
  }

}
