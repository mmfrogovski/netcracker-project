import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserSub} from "../../models/user-sub";
import {Observable, ObservedValueOf} from "rxjs";
import {BackendUrlsConst} from "../const-service/backend-urls.const";
import {RegistrationData} from "../../models/registr";
import {User} from "../../models/user";
import {BillingAccount} from "../../models/billing-account";
import {LoginModel} from "../../models/login-model";

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {


  constructor(private http: HttpClient, private constUrls: BackendUrlsConst) {
  }

  public saveUserSub(newSub: UserSub): Observable<UserSub> {
    return this.http.post<UserSub>(this.constUrls.backendUrlUsersSubs, newSub);
  }

  public registUser(registrationData: RegistrationData): Observable<RegistrationData> {
    return this.http.post<RegistrationData>( '/api/signup', registrationData);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.constUrls.backendUrlUsers);
  }

  public getBillingAccountById(id: number): Observable<BillingAccount> {
    return this.http.get<BillingAccount>(this.constUrls.backendUrlBillingAccounts + id);
  }

  public getUserSubscriptionById(id: number): Observable<UserSub[]> {
    return this.http.get<UserSub[]>(this.constUrls.backendUrlUsersSubs + 'customer/' + id);
  }

  public getUserByLoginAndPassword(login: string, password: string): Observable<User> {
    return this.http.get<User>(this.constUrls.backendUrlUsers + login + '/' + password);
  }

  public getSubscriptionByCustomerAndServiceId(customerId: number, serviceId: number): Observable<UserSub> {
    return this.http.get<UserSub>(this.constUrls.backendUrlUsersSubs + 'customer/' + customerId + '/service/' + serviceId);
  }

  public setBillingAccountResources(resources: number, billingAccount: BillingAccount): Observable<void> {
    return this.http.put<void>(this.constUrls.backendUrlBillingAccounts + billingAccount.id + '/' + resources, billingAccount);
  }

  public setUserSubscriptionActive(subscription: UserSub, status: boolean): Observable<void> {
    return this.http.put<void>(this.constUrls.backendUrlUsersSubs + subscription.id + '/' + status, subscription);
  }

  public deleteUserSub(id: number): Observable<void> {
    return this.http.delete<void>(this.constUrls.backendUrlUsersSubs + id);
  }

  public generateToken(login: LoginModel): Observable<AuthToken>{
    return this.http.post<AuthToken>('/api/token/generate-token', login);
  }

  public getAuthorizedUser():Observable<User>{
    return this.http.get<User>('/api/current');
  }
}

export interface AuthToken {
  readonly token: string;
}
