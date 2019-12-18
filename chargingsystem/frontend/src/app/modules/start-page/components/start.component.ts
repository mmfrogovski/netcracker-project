import {Component, OnInit} from "@angular/core";
import {AllServicesService} from "../../../services/all-services/all-services.service";
import {Service} from "../../../models/service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

  public mostPopularService: Service;
  public lastAddedService: Service;

  constructor(private allServicesService: AllServicesService) {
  }

  ngOnInit() {
    this.getLastAddedService();
    this.getMostPopularService();
  }

  public getMostPopularService(): void {
    this.allServicesService.getMostPopularService().subscribe(res => {
      this.mostPopularService = res;
    });
  }

  public getLastAddedService(): void {
    this.allServicesService.getLastAddedService().subscribe(res => {
      this.lastAddedService = res;
    });
  }

}
