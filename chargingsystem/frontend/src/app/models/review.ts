import {Customer} from "./customer";
import {Service} from "./service";

export class Review {
  public id:number;
  public review:string;
  public reviewDate:string;
  public customer:Customer;
  public subscription: Service;
}
