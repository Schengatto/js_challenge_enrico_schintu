import CartItemModel from "@/models/cart-item.model";

/**
 * This interface describes the structure of the cart store.
 */
export default interface CartStoreModel {
  items: CartItemModel[];
  totalPrice: number;
}
