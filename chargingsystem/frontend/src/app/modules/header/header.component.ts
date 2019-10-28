import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showLogin(){
    document.querySelector(".overlay").id = "show";
  }

  closeLogin(){
    document.querySelector(".overlay").id = "";
  }

}
