import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";
import WishlistStoreModel from "@/store/wishlist/wishlist-store.model";
import EventItem from "@/models/event.item";
import EventItemModel from "@/models/event.item";

const STORAGE_KEY = "APP_WISHLIST_STORE";
const INIT_STATE: WishlistStoreModel = {items: []};
const persistOnLocalStorage = (wishlistStoreModel: WishlistStoreModel) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistStoreModel));
const loadFromLocalStorage: () => any = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) as string);

@Module({
  dynamic: true,
  namespaced: true,
  name: "wishlist",
  store
})
class WishlistStore extends VuexModule {
  wishlistStore: WishlistStoreModel = loadFromLocalStorage() || INIT_STATE;

  /**
   * List of {@link EventItem} items in the wishlist store.
   */
  get getItems(): EventItem[] {
    return this.wishlistStore.items;
  }

  /**
   * The number of the items in the wishlist.
   */
  get numberOfItems(): number {
    return this.wishlistStore.items.length;
  }

  /**
   * List of ids of items present in the user wishlist.
   */
  get getItemsIds(): string[] {
    return this.wishlistStore.items.map(i => i.uuid);
  }

  /**
   * Add items into the wishlist and then save the store status in the browser localstorage.
   * @param items
   */
  @Mutation
  async WISHLIST_ADD(items: EventItem[]) {
    this.wishlistStore.items = [...this.wishlistStore.items, ...items];
    persistOnLocalStorage(this.wishlistStore);
  }

  /**
   * Remove items from the user's wishlist and then save the store status in the browser localstorage.
   * @param ids
   */
  @Mutation
  async WISHLIST_REMOVE(ids: string[]) {
    this.wishlistStore.items = this.wishlistStore.items.filter(item => !ids.includes(item.uuid));
    persistOnLocalStorage(this.wishlistStore);
  }

  /**
   * Update the items present in the store with the information of the item provided in input.
   * @param data
   */
  @Mutation
  async UPDATE_WISHLIST_ITEMS(data: EventItemModel[]) {
    let updatedItems: EventItemModel[] = [];
    const currentItems = [...this.wishlistStore.items];
    data.forEach(i => {
      currentItems
        .filter(e => e.uuid === i.uuid)
        .forEach(()=> updatedItems.push(i));
    });
    this.wishlistStore.items = [...updatedItems];
    persistOnLocalStorage(this.wishlistStore);
  }

  /**
   * Remove all the items from the user's wishlist and then save the store status in the browser localstorage.
   */
  @Mutation
  async WISHLIST_CLEAR() {
    this.wishlistStore.items = [];
    persistOnLocalStorage(this.wishlistStore);
  }

  /**
   * Add or remove an item from the user's wishlist.
   * @param item
   */
  @Action
  async toggleItem(item: EventItem) {
    if (this.wishlistStore.items.find(i => i.uuid === item.uuid)) {
      await this.WISHLIST_REMOVE([item.uuid]);
    } else {
      await this.WISHLIST_ADD([item]);
    }
  }

  /**
   * Add a single item into the user's wishlist.
   * @param item
   */
  @Action
  async addSingle(item: EventItem) {
    await this.WISHLIST_ADD([item]);
  }

  /**
   * Add multiple items into the user's wishlist.
   * @param items
   */
  @Action
  async addMultiple(items: EventItem[]) {
    await this.WISHLIST_ADD(items);
  }

  /**
   * Remove a single item from the user's wishlist.
   * @param id
   */
  @Action
  async removeSingle(id: string) {
    await this.WISHLIST_REMOVE([id]);
  }

  /**
   * Remove multiple items from the user's wishlist.
   * @param ids
   */
  @Action
  async removeMultiple(ids: string[]) {
    await this.WISHLIST_REMOVE(ids);
  }

  /**
   * Remove all the items present in the user's wishlist.
   */
  @Action
  async clear() {
    await this.WISHLIST_CLEAR();
  }

  /**
   * Update the items present in the store with the information of the item provided in input.
   * @param data
   */
  @Action
  async updateItems(data: EventItem[]) {
    await this.UPDATE_WISHLIST_ITEMS(data);
  }

}

export default getModule(WishlistStore);
