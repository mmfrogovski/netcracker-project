import {Observable} from "rxjs";
import {Place} from "../../models/place";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlaceService { //todo create interface

  constructor(private http: HttpClient) {
  }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>('http://localhost:8080/api/places');
  }
}
