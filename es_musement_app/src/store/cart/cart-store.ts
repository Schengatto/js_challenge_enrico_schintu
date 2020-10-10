import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {MusementItem} from '@/models/musement.models';
import store from '@/store';
import CartStoreModel from '@/store/cart/cart-store.model';
import EventItemModel from '@/models/event.item';
import EventItem from "@/models/event.item";

const STORAGE_KEY = 'APP_CART_STORE';
const INIT_STATE: CartStoreModel = {items: [], totalPrice: 0};
const persistOnLocalStorage = (cartStore: CartStoreModel) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartStore));
const loadFromLocalStorage: () => any = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) as string);

@Module({
  dynamic: true,
  namespaced: true,
  name: 'cart',
  store
})
class CartStore extends VuexModule {
  cartStore: CartStoreModel = loadFromLocalStorage() || INIT_STATE;

  /**
   * All the items present in the user cart.
   */
  get getItems(): EventItemModel[] {
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
   * @param items
   */
  @Mutation
  async ADD_TO_CART(items: EventItemModel[]) {
    const updatedItems = [...this.cartStore.items];
    items.forEach(i => {
      const currentItem = updatedItems.find(e => e.uuid === i.uuid);
      if (currentItem) {
        currentItem.tickets = currentItem.tickets + 1;
      } else {
        updatedItems.push(i);
      }
    });
    this.cartStore.items = updatedItems;
    persistOnLocalStorage(this.cartStore);
  }

  /**
   * Remove items from the user's cart  and then save the store status in the browser localstorage.
   * @param ids
   */
  @Mutation
  async REMOVE_FROM_CART(ids: string[]) {
    this.cartStore.items = this.cartStore.items.filter(
      item => !ids.includes(item.uuid)
    );
    persistOnLocalStorage(this.cartStore);
  }

  /**
   * Update the items present in the store with the information of the item provided in input.
   * @param data
   */
  @Mutation
  async UPDATE_CART_ITEMS(data: EventItemModel[]) {
    let updatedItems: EventItemModel[] = [];
    const currentItems = [...this.cartStore.items];
    data.forEach(i => {
      currentItems
        .filter(e => e.uuid === i.uuid)
        .map((e) => {
          return {...i, tickets: e.tickets};
        })
        .forEach(e => updatedItems.push(e));
    });
    this.cartStore.items = [...updatedItems];
    persistOnLocalStorage(this.cartStore);
  }

  /**
   * Update the total amount of the cart items stored.
   */
  @Mutation
  async UPDATE_TOTAL_AMOUNT() {
    this.cartStore.totalPrice = this.cartStore.items
      .reduce((acc, cur) => acc + (cur.tickets * cur.finalPrice), 0);
    persistOnLocalStorage(this.cartStore);
  }

  /**
   * Remove all the items from the user's wishlist and then save the store status in the browser localstorage.
   */
  @Mutation
  async CART_CLEAR() {
    this.cartStore = {...INIT_STATE};
    persistOnLocalStorage(this.cartStore);
  }

  /**
   * Add a single item into the user's cart.
   * @param item
   */
  @Action
  async addSingle(item: EventItem) {
    await this.ADD_TO_CART([item]);
    await this.UPDATE_TOTAL_AMOUNT();
  }

  /**
   * Add multiple items into the user's cart.
   * @param items
   */
  @Action
  async addMultiple(items: EventItem[]) {
    await this.ADD_TO_CART(items);
    await this.UPDATE_TOTAL_AMOUNT();
  }

  /**
   * Remove a single item from the user's cart.
   * @param id
   */
  @Action
  async removeSingle(id: string) {
    await this.REMOVE_FROM_CART([id]);
    await this.UPDATE_TOTAL_AMOUNT();
  }

  /**
   * Remove multiple items from the user's cart.
   * @param ids
   */
  @Action
  async removeMultiple(ids: string[]) {
    await this.REMOVE_FROM_CART(ids);
    await this.UPDATE_TOTAL_AMOUNT();
  }

  /**
   * Remove all the items present in the user's cart.
   */
  @Action
  async clear() {
    await this.CART_CLEAR();
  }

  /**
   * Update the items present in the store with the information of the item provided in input.
   * @param data
   */
  @Action
  async updateItems(data: EventItemModel[]) {
    await this.UPDATE_CART_ITEMS(data);
    await this.UPDATE_TOTAL_AMOUNT();
  }


}

export default getModule(CartStore);
