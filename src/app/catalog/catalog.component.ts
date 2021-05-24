// angular dependencies
import { Component } from "@angular/core";

// services
import { CatalogService } from "./catalog.service";

@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.css"]
})
export class CatalogComponent {
  constructor(private catalogService: CatalogService) {}

  // declare variables
  selectedItem: string; // store the catalog which is choosen
  items: string[] = ["Blasters", "Laser Sabers"];

  // handle the click event of catalogClick
  catalogClick(event, newValue: string) {
    // store the new catalog which was clicked to selectedItem
    this.selectedItem = newValue;
    // use the function in catalog service to set the selected catalog
    this.catalogService.setSelectedCatalog(this.selectedItem);
  }
}
