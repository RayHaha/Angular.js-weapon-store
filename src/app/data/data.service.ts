// angular dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

// models
import { Blaster } from "./blaster.model";
import { LaserSaber } from "./laser-saber.model";

@Injectable()
export class DataService {
  // declare variables
  blastersUpdated = new Subject<Blaster[]>();
  laserSabersUpdated = new Subject<LaserSaber[]>();

  constructor(private httpClient: HttpClient) {}

  // get the data of blasters from API
  // use the fake data in this programming challenge, so get the data from blasters.json
  getBlastersFromAPI() {
    this.httpClient
      .get<Blaster[]>("assets/data/blasters.json")
      .subscribe(data => {
        // asynchronous getting data, use subject to send the data
        this.blastersUpdated.next(data);
      });
  }

  // get the data of laser saber from API
  // use the fake data in this programming challenge, so get the data from laser-sabers.json
  getLaserSabersFromAPI() {
    this.httpClient
      .get<LaserSaber[]>("assets/data/laser-sabers.json")
      .subscribe(data => {
        // asynchronous getting data, use subject to send the data
        this.laserSabersUpdated.next(data);
      });
  }
}
