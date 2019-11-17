import {Observable} from "rxjs";
import {Service} from "../../models/service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BackendUrlsConst} from "../const-service/backend-urls.const";


@Injectable({
  providedIn: 'root'
})
export class AllServicesService {


  constructor(private http: HttpClient, private backUrls: BackendUrlsConst) {
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.backUrls.backendUrlAllSubs);
  }

  getServicePage(page: number): Observable<Service[]> {
    return this.http.get<Service[]>(this.backUrls.backendUrlAllSubs + 'pages/' + page);
  }

  getServiceById(id): Observable<Service> {
    return this.http.get<Service>(this.backUrls.backendUrlAllSubs + id);
  }

  saveService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.backUrls.backendUrlAllSubs, service);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(this.backUrls.backendUrlAllSubs + id);
  }

}
