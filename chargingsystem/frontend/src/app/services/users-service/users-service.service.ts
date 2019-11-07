import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserSub} from "../../models/user-sub";
import {Observable} from "rxjs";
import {BackendUrlsConst} from "../const-service/backend-urls.const";
import {RegistrationData} from "../../models/registr";

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService { //todo create interface


  constructor(private http: HttpClient, private constUrls: BackendUrlsConst) { }

  saveUserSub(newSub: UserSub):Observable<UserSub>{
    return this.http.post<UserSub>(this.constUrls.backendUrlUsersSubs, newSub);
  }

  registUser(registrationData: RegistrationData):Observable<RegistrationData>{
    return this.http.post<RegistrationData>(this.constUrls.backendUrlUsers + 'register', registrationData);
  }

  getUserSubscriptionById(id: number):Observable<UserSub[]>{
    return this.http.get<UserSub[]>(this.constUrls.backendUrlUsersSubs + 'customer/' + id);
  }

  deleteUserSub(id: bigint):Observable<void>{
    return this.http.delete<void>(this.constUrls.backendUrlUsersSubs + id);
  }
}
