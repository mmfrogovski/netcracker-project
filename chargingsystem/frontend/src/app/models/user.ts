import {Customer} from "./customer";

export interface User {
  id:number;
  login:string;
  password:string;
  role:boolean;
  customer:Customer;
}
