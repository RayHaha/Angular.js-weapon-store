// angular dependencies
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// components
import { AppComponent } from "./app.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { CommodityComponent } from "./commodity/commodity.component";
import { CartComponent } from "./cart/cart.component";
import { HeaderComponent } from "./header/header.component";
import { BlastersComponent } from './commodity/blasters/blasters.component';
import { LaserSabersComponent } from './commodity/laser-sabers/laser-sabers.component';

// services
import { CatalogService } from "./catalog/catalog.service";
import { DataService } from "./data/data.service";
import { CartService } from "./cart/cart.service";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    CatalogComponent,
    CommodityComponent,
    CartComponent,
    HeaderComponent,
    BlastersComponent,
    LaserSabersComponent
  ],
  bootstrap: [AppComponent],
  providers: [CatalogService, DataService, CartService]
})
export class AppModule {}
