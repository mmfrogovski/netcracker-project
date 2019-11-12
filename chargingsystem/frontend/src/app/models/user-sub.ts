import {Service} from "./service";
import {Customer} from "./customer";

export class UserSub {
  public restOfSub:number;
  public startSub:string;
  public active: boolean;
  public customer:Customer;
  public subscription:Service;
}
