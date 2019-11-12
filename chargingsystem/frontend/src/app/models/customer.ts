import {BillingAccount} from "./billing-account";

export interface Customer {
  id:number;
  age:number;
  email:string;
  name:string;
  billingAccount:BillingAccount;
}
