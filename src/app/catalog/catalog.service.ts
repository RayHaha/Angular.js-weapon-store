// angular dependencies
import { Subject } from "rxjs";

export class CatalogService {
  // declare variables
  catalogChanged = new Subject<string>();
  private selectedCatalog: string;  // store the catalog which is choosen

  // get the selected catalog
  getSelectedCatalog() {
    return this.selectedCatalog.slice();
  }

  // set the selected catalog
  setSelectedCatalog(value: string) {
    this.selectedCatalog = value;
    // use subject to send the updated data
    this.catalogChanged.next(this.selectedCatalog.slice());
  }
}
