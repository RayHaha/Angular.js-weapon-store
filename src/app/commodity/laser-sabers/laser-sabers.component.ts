// angular dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

// models
import { LaserSaber } from "../../data/laser-saber.model";
import { CartItem } from "../../cart/cart-item.model";

// services
import { CartService } from "../../cart/cart.service";
import { DataService } from "../../data/data.service";

@Component({
  selector: 'app-laser-sabers',
  templateUrl: './laser-sabers.component.html',
  styleUrls: ['./laser-sabers.component.css']
})
export class LaserSabersComponent implements OnInit, OnDestroy {
  constructor(
    private dataService: DataService,
    private cartService: CartService
  ) {}

  // declare variables
  laserSabersList: LaserSaber[] = []; // array which store the data of laser sabers
  private laserSabersSub: Subscription; // subscription to get the date of laser sabers

  ngOnInit() {
    // use the function to load every data
    this.loadData();
  }

  loadData() {
    // use the function in data service to load the data asynchronously
    this.dataService.getLaserSabersFromAPI();

    // use the subject in data service to get the data
    this.laserSabersSub = this.dataService.laserSabersUpdated.subscribe(
      (laserSabersList: LaserSaber[]) => {
        // put the list of laser sabers into laserSabersList in this component
        this.laserSabersList = laserSabersList;
        // only need to load the data once, release the resources after getting data
        this.laserSabersSub.unsubscribe();
      }
    );
  }

  // add the commodity to cart
  onSubmit(form: NgForm, commodity: LaserSaber) {
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
    this.laserSabersSub.unsubscribe();
  }
}