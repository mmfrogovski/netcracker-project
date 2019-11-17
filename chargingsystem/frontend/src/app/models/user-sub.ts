import {Service} from "./service";
import {Customer} from "./customer";

export class UserSub {
  public id:number;
  public subStart:string;
  public active: boolean;
  public subDuration:number;
  public discount:number;
  public customer:Customer;
  public subscription:Service;
}
