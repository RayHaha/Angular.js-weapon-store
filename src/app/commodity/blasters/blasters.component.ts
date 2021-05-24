// angular dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

// models
import { Blaster } from "../../data/blaster.model";
import { CartItem } from "../../cart/cart-item.model";

// services
import { CartService } from "../../cart/cart.service";
import { DataService } from "../../data/data.service";

@Component({
  selector: "app-blasters",
  templateUrl: "./blasters.component.html",
  styleUrls: ["./blasters.component.css"]
})
export class BlastersComponent implements OnInit, OnDestroy {
  constructor(
    private dataService: DataService,
    private cartService: CartService
  ) {}

  // declare variables
  blastersList: Blaster[] = []; // array which store the data of blasters
  private blastersSub: Subscription; // subscriptiion to get the data of blasters

  ngOnInit() {
    // use the function to load every data
    this.loadData();
  }

  loadData() {
    // use the function in data service to load the data asynchronously
    this.dataService.getBlastersFromAPI();

    // use the subject in data service to get the data
    this.blastersSub = this.dataService.blastersUpdated.subscribe(
      (blastersList: Blaster[]) => {
        // put the list of blasters into blastersList in this component
        this.blastersList = blastersList;
        // only need to load the data once, release the resources after getting data
        this.blastersSub.unsubscribe();
      }
    );
  }

  // add the commodity to cart
  onSubmit(form: NgForm, commodity: Blaster) {
    // generate a cart item
    let item: CartItem = {
      name: commodity.name,
      price: commodity.price,
      quantity: form.value.quantity
    };
    // reset the quantity
    form.controls['quantity'].setValue(0);
    // use the function in cart service to add the commodity to cart
    this.cartService.addCommodityToCart(item);
  }

  ngOnDestroy(): void {
    // release the resources while the component is destroied
    this.blastersSub.unsubscribe();
  }
}
