// angular dependencies
import { Subject } from "rxjs";

// models
import { CartItem } from "./cart-item.model";

export class CartService {
  // declare variables
  private cartList: CartItem[] = []; // store the item which was added to the cart
  private totalPrice: number = 0; // store the total price
  cartChanged = new Subject<CartItem[]>();

  // add commodity to cart
  addCommodityToCart(commodity: CartItem) {
    // check if the commodity was already in the array
    let index = this.cartList.findIndex(item => item.name === commodity.name);
    if (index < 0) {
      // if not, add a new one to the array
      this.cartList.push(commodity);
    } else {
      // only add the quantity if the commodity was already in the array
      this.cartList[index].quantity += commodity.quantity;
    }
    // use subject to send the updated data
    this.cartChanged.next(this.cartList.slice());
  }

  // remove commodity from cart
  removeCommodityFromCart(index: number) {
    // remove commodity
    this.cartList.splice(index, 1);
    // use subject to send the updated data
    this.cartChanged.next(this.cartList.slice());
  }

  // calculate the total price of commodities
  getTotalPrice() {
    this.totalPrice = 0;
    for (let item of this.cartList) {
      this.totalPrice += item.price * item.quantity;
    }
    return this.totalPrice;
  }
}
