import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewUserSub} from "../../models/new-user-sub";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService { //todo create interface

  private url = `http://localhost:8083/api/users_subs/`;


  constructor(private http: HttpClient) { }

  saveUserSub(newSub: NewUserSub):Observable<NewUserSub>{
    return this.http.post<NewUserSub>(this.url, newSub);
  }

  deleteUserSub(id: bigint):Observable<void>{
    return this.http.delete<void>(this.url + id);
  }
}
