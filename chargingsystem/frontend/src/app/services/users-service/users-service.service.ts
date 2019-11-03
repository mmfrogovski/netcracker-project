import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserSub} from "../../models/user-sub";
import {Observable} from "rxjs";
import {ConstantsService} from "../const-service/constants.service";

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService { //todo create interface


  constructor(private http: HttpClient, private constUrls: ConstantsService) { }

  saveUserSub(newSub: UserSub):Observable<UserSub>{
    return this.http.post<UserSub>(this.constUrls.backendUrlUsersSubs, newSub);
  }

  getUserSubscriptionById(id: number):Observable<UserSub[]>{
    return this.http.get<UserSub[]>(this.constUrls.backendUrlUsersSubs + 'customer/' + id);
  }

  deleteUserSub(id: bigint):Observable<void>{
    return this.http.delete<void>(this.constUrls.backendUrlUsersSubs + id);
  }
}
