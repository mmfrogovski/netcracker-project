import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersServiceService} from "../../services/users-service/users-service.service";
import {User} from "../../models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit, OnDestroy {

  public users: User[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private usersService: UsersServiceService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.subscriptions.push(this.usersService.getUsers().subscribe(res => {
      this.users = res;
      this.deleteFake();
    }));
  }

  public deleteUser(id: number, i: number):void{
    this.usersService.deleteUserById(id).subscribe();
    this.users.splice(i, 1);
  }

  public deleteFake(): void {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == 3) {
        this.users.splice(i,1);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
