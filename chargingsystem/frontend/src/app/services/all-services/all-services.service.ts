import {Observable} from "rxjs";
import {Service} from "../../models/service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BackendUrlsConst} from "../const-service/backend-urls.const";
import {Page} from "../../models/page";


@Injectable({
  providedIn: 'root'
})
export class AllServicesService {


  constructor(private http: HttpClient, private backUrls: BackendUrlsConst) {
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.backUrls.backendUrlAllSubs);
  }

  getServicePage(page: number, size: number): Observable<Page> {
    return this.http.get<Page>(this.backUrls.backendUrlAllSubs + 'pages/' + page + '/' + size);
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
