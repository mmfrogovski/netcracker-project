import {Component, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {StorageService} from "../../services/storage-service/storage-service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public user: User;

  constructor(private localStorage:StorageService) { }

  ngOnInit() {
    this.user = this.localStorage.getCurrentUser();
  }

}
