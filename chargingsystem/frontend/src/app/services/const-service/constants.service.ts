import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  readonly backendUrl: string = 'http://localhost:8083/api/';
  readonly backendUrlAllSubs: string = this.backendUrl+'all_subs/';
  readonly backendUrlUsersSubs: string = this.backendUrl+'users_subs/';
  readonly backendUrlCustomers: string = this.backendUrl+'customers/';
  readonly backendUrlBillingAccounts: string = this.backendUrl+'billing_accounts/';
  readonly backendUrlReviews: string = this.backendUrl+'reviews/';

  constructor() { }
}
