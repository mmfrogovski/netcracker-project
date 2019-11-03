import {Observable} from "rxjs";
import {Service} from "../../models/service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ConstantsService} from "../const-service/constants.service";

@Injectable({
  providedIn: 'root'
})
export class AllServicesService {  //todo create interface


  constructor(private http: HttpClient, private backUrls: ConstantsService) {
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.backUrls.backendUrlAllSubs);
  }

  getServiceById(id):Observable<Service>{
    return this.http.get<Service>(this.backUrls.backendUrlAllSubs+id);
  }

  saveService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.backUrls.backendUrlAllSubs, service);
  }

  deleteService(id: number):Observable<void> {
    return this.http.delete<void>(this.backUrls.backendUrlAllSubs + id);
  }

}
