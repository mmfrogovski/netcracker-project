import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserSub} from "../../models/user-sub";
import {Observable} from "rxjs";
import {BackendUrlsConst} from "../const-service/backend-urls.const";
import {RegistrationData} from "../../models/registr";
import {User} from "../../models/user";
import {BillingAccount} from "../../models/billing-account";

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {


  constructor(private http: HttpClient, private constUrls: BackendUrlsConst) {
  }

  saveUserSub(newSub: UserSub): Observable<UserSub> {
    return this.http.post<UserSub>(this.constUrls.backendUrlUsersSubs, newSub);
  }

  registUser(registrationData: RegistrationData): Observable<RegistrationData> {
    return this.http.post<RegistrationData>(this.constUrls.backendUrlUsers + 'register', registrationData);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.constUrls.backendUrlUsers);
  }

  getBillingAccountById(id: number): Observable<BillingAccount> {
    return this.http.get<BillingAccount>(this.constUrls.backendUrlBillingAccounts + id);
  }

  getUserSubscriptionById(id: number): Observable<UserSub[]> {
    return this.http.get<UserSub[]>(this.constUrls.backendUrlUsersSubs + 'customer/' + id);
  }

  getUserByLoginAndPassword(login: string, password: string): Observable<User> {
    return this.http.get<User>(this.constUrls.backendUrlUsers + login + '/' + password);
  }

  getSubscriptionByCustomerAndServiceId(customerId: number, serviceId: number): Observable<UserSub> {
    return this.http.get<UserSub>(this.constUrls.backendUrlUsersSubs + 'customer/' + customerId + '/service/' + serviceId);
  }

  setBillingAccountResources(resources: number, billingAccount: BillingAccount): Observable<void> {
    return this.http.put<void>(this.constUrls.backendUrlBillingAccounts + billingAccount.id + '/' + resources, billingAccount);
  }

  setUserSubscriptionActive(subscription: UserSub, status: boolean): Observable<void> {
    return this.http.put<void>(this.constUrls.backendUrlUsersSubs + subscription.id + '/' + status, subscription);
  }

  deleteUserSub(id: number): Observable<void> {
    return this.http.delete<void>(this.constUrls.backendUrlUsersSubs + id);
  }
}
