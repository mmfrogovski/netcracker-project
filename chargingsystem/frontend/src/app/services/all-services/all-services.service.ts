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

  public getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.backUrls.backendUrlAllSubs);
  }

  public getServicePage(page: number, size: number): Observable<Page> {
    return this.http.get<Page>(this.backUrls.backendUrlAllSubs + 'pages/' + page + '/' + size);
  }

  public getServiceById(id): Observable<Service> {
    return this.http.get<Service>(this.backUrls.backendUrlAllSubs + id);
  }

  public saveService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.backUrls.backendUrlAllSubs, service);
  }

  public editService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.backUrls.backendUrlAllSubs + 'edit', service);
  }

  public getNumberOfServiceSubscriptions(): Observable<number[]> {
    return this.http.get<number[]>(this.backUrls.backendUrlUsersSubs + 'servicesNumOfSub');
  }

  public deleteService(id: number): Observable<void> {
    return this.http.delete<void>(this.backUrls.backendUrlAllSubs + id);
  }

  public getMostPopularService(): Observable<Service> {
    return this.http.get<Service>(this.backUrls.backendUrlAllSubs + 'mostPopular');
  }

  public getLastAddedService(): Observable<Service> {
    return this.http.get<Service>(this.backUrls.backendUrlAllSubs + 'lastAdded');
  }

  public getServicesByTags(tags: string): Observable<Service[]> {
    return this.http.get<Service[]>(this.backUrls.backendUrlAllSubs + 'search/' + tags);
  }
}
