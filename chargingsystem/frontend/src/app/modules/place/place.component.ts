import {PlaceService} from "../../services/place/place.service";
import {Place} from "../../models/place";
import {Subscription} from "rxjs";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html'
})
export class PlaceComponent implements OnInit {

  places:Place[];

  private subscriptions: Subscription[] = [];


  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.placeService.getPlaces().subscribe((data) => {
      this.places = data;
    });
  }

}
