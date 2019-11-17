import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendUrlsConst {

  // readonly backendUrl: string = 'http://localhost:8083/api/';
  readonly backendUrlAllSubs: string = 'api/all_subs/';
  readonly backendUrlUsersSubs: string = 'api/users_subs/';
  readonly backendUrlCustomers: string = 'api/customers/';
  readonly backendUrlBillingAccounts: string = 'api/billing_accounts/';
  readonly backendUrlReviews: string = 'api/reviews/';
  readonly backendUrlUsers: string = 'api/users/';

  constructor() { }
}
