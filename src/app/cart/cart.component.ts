// angular dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

// models
import { CartItem } from "./cart-item.model";

// services
import { CartService } from "./cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(private cartService: CartService) {}

  // declare variables
  cartList: CartItem[] = []; // store the item which was added to the cart
  totalPrice: number = 0; // store the total price
  subscription: Subscription;

  ngOnInit() {
    // use the subject in cart service to get the data
    this.subscription = this.cartService.cartChanged.subscribe(
      (cartList: CartItem[]) => {
        // put the cart list into cartList in this component
        this.cartList = cartList;
        // calculate the total price
        this.totalPrice = this.cartService.getTotalPrice();
      }
    );
  }

  // cancel the item in the cart
  onCancel(index: number) {
    // use the function in cart service to remove the commodity from cart
    this.cartService.removeCommodityFromCart(index);
  }

  ngOnDestroy() {
    // release the resources while the component is destroied
    this.subscription.unsubscribe();
  }
}
