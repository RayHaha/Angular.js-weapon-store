// angular dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

// services
import { CatalogService } from "../catalog/catalog.service";

@Component({
  selector: "app-commodity",
  templateUrl: "./commodity.component.html",
  styleUrls: ["./commodity.component.css"]
})
export class CommodityComponent implements OnInit, OnDestroy {
  constructor(private catalogService: CatalogService) {}

  // declare variables
  selectedCatalog: string; // which catalog is choosen now
  private catalogSub: Subscription; // subscription to get the choosen catalog

  ngOnInit() {
    // use the subject in catalog service to get the data
    this.catalogSub = this.catalogService.catalogChanged.subscribe(
      (selectedCatalog: string) => {
        // put the choosen catalog into selectedCatalog in this component
        this.selectedCatalog = selectedCatalog;
      }
    );
  }

  ngOnDestroy(): void {
    // release the resources while the component is destroied
    this.catalogSub.unsubscribe();
  }
}
