import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendUrlsConst} from "../const-service/backend-urls.const";
import {Observable} from "rxjs";
import {Review} from "../../models/review";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService { //todo create interface

  constructor(private http: HttpClient, private backUrls: BackendUrlsConst) {
  }

  getReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.backUrls.backendUrlReviews+id);
  }

  saveReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.backUrls.backendUrlReviews, review);
  }

  deleteReview(id: number):Observable<void> {
    return this.http.delete<void>(this.backUrls.backendUrlReviews + id);
  }

}
