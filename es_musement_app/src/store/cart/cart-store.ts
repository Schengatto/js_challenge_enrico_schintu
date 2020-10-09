import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {MusementItem} from "@/models/musement.models";
import store from "@/store";
import CartStoreModel from "@/store/cart/cart-store.model";
import CartItemModel from "@/models/cart-item.model";

const STORAGE_KEY = "APP_CART_STORE";
const INIT_STATE: CartStoreModel = {items: [], totalPrice: 0};
const persistOnLocalStorage = (cartStore: CartStoreModel) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartStore));
const loadFromLocalStorage: () => any = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) as string);

@Module({
  dynamic: true,
  namespaced: true,
  name: "cart",
  store
})
class CartStore extends VuexModule {
  cartStore: CartStoreModel = loadFromLocalStorage() || INIT_STATE;

  /**
   * All the items present in the user cart.
   */
  get getItems(): CartItemModel[] {
    return this.cartStore.items;
  }

  /**
   * Total number of tickets in the user cart.
   */
  get numberOfTickets(): number {
    return this.cartStore.items
      .map(i => i.tickets)
      .reduce((cur: number, acc: number) => cur + acc, 0);
  }

  /**
   * Final price of the tickets in the user cart.
   */
  get totalAmount(): number {
    return this.cartStore.totalPrice;
  }

  /**
   * List of ids of items present in the user cart.
   */
  get getItemsIds(): string[] {
    return this.cartStore.items.map(i => i.uuid);
  }

  /**
   * Add items into the user bag.
   * If is already present an item with the same id then the methods will increment the number of tickets.
   * Then the method saves the store status into the browser localstorage.
   * @param originalItems
   */
  @Mutation
  ADD_TO_CART(originalItems: MusementItem[]): void {
    const items: CartItemModel[] = originalItems.map(
      CartStore.fromMusementItemToCartItem
    );
    const updatedItems = [...this.cartStore.items];
    items.forEach(i => {
      const currentItem = updatedItems.find(e => e.uuid === i.uuid);
      if (currentItem) {
        currentItem.tickets++;
      } else {
        updatedItems.push(i);
      }
    });
    const totalPrice = updatedItems
      .map(i => i.finalPrice * i.tickets)
      .reduce((cur, acc) => acc + cur, 0);
    this.cartStore = {items: updatedItems, totalPrice: totalPrice};
    persistOnLocalStorage(this.cartStore);
  }

  /**
   * Remove items from the user's cart  and then save the store status in the browser localstorage.
   * @param ids
   */
  @Mutation
  REMOVE_FROM_CART(ids: string[]): void {
    const updatedItems = this.cartStore.items.filter(
      item => !ids.includes(item.uuid)
    );
    const totalPrice = updatedItems
      .map(i => i.finalPrice)
      .reduce((cur, acc) => acc + cur, 0);
    this.cartStore = {items: updatedItems, totalPrice: totalPrice};
    persistOnLocalStorage(this.cartStore);
  }

  /**
   * Remove all the items from the user's wishlist and then save the store status in the browser localstorage.
   */
  @Mutation
  CART_CLEAR(): void {
    this.cartStore = {...INIT_STATE};
    persistOnLocalStorage(this.cartStore);
  }

  /**
   * Add a single item into the user's cart.
   * @param item
   */
  @Action
  addSingle(item: MusementItem): void {
    this.ADD_TO_CART([item]);
  }

  /**
   * Add multiple items into the user's cart.
   * @param items
   */
  @Action
  addMultiple(items: MusementItem[]): void {
    this.ADD_TO_CART(items);
  }

  /**
   * Remove a single item from the user's cart.
   * @param id
   */
  @Action
  removeSingle(id: string): void {
    this.REMOVE_FROM_CART([id]);
  }

  /**
   * Remove multiple items from the user's cart.
   * @param ids
   */
  @Action
  removeMultiple(ids: string[]): void {
    this.REMOVE_FROM_CART(ids);
  }

  /**
   * Remove all the items present in the user's cart.
   */
  @Action
  clear(): void {
    this.CART_CLEAR();
  }

  /**
   * Transform the object of type {@link MusementItem} provided as argument into a {@link CartItemModel}.
   * The output object keeps just the relevant information of the original object.
   * @param musementItem
   */
  private static fromMusementItemToCartItem(musementItem: MusementItem): CartItemModel {
    return {
      uuid: musementItem.uuid,
      title: musementItem.title,
      image: musementItem.cover_image_url,
      discounted: musementItem.discount > 0,
      originalPrice: musementItem.original_retail_price.value,
      finalPrice: musementItem.retail_price.value,
      tickets: 1
    };
  }
}

export default getModule(CartStore);
