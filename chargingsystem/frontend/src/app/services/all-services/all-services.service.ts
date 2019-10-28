import {Observable} from "rxjs";
import {Service} from "../../models/service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AllServicesService {  //todo create interface

  private url = `http://localhost:8083/api/all_subs/`;

  constructor(private http: HttpClient) {
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.url);
  }

  getServiceById(id):Observable<Service>{
    return this.http.get<Service>(this.url+id);
  }

  saveService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.url, service);
  }

  deleteService(id: bigint):Observable<void> {
    return this.http.delete<void>(this.url + id);
  }

}
