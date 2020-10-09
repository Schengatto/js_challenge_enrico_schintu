import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {MusementItem} from "@/models/musement.models";
import store from "@/store";
import WishlistStoreModel from "@/store/wishlist/wishlist-store.model";

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
   * List of {@link MusementItem} items in the wishlist store.
   */
  get getItems(): MusementItem[] {
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
  WISHLIST_ADD(items: MusementItem[]): void {
    this.wishlistStore.items = [...this.wishlistStore.items, ...items];
    persistOnLocalStorage(this.wishlistStore);
  }

  /**
   * Remove items from the user's wishlist and then save the store status in the browser localstorage.
   * @param ids
   */
  @Mutation
  WISHLIST_REMOVE(ids: string[]): void {
    this.wishlistStore.items = this.wishlistStore.items.filter(item => !ids.includes(item.uuid));
    persistOnLocalStorage(this.wishlistStore);
  }

  /**
   * Remove all the items from the user's wishlist and then save the store status in the browser localstorage.
   */
  @Mutation
  WISHLIST_CLEAR(): void {
    this.wishlistStore.items = [];
    persistOnLocalStorage(this.wishlistStore);
  }

  /**
   * Add or remove an item from the user's wishlist.
   * @param item
   */
  @Action
  toggleItem(item: MusementItem): void {
    if (this.wishlistStore.items.find(i => i.uuid === item.uuid)) {
      this.WISHLIST_REMOVE([item.uuid]);
    } else {
      this.WISHLIST_ADD([item]);
    }
  }

  /**
   * Add a single item into the user's wishlist.
   * @param item
   */
  @Action
  addSingle(item: MusementItem): void {
    this.WISHLIST_ADD([item]);
  }

  /**
   * Add multiple items into the user's wishlist.
   * @param items
   */
  @Action
  addMultiple(items: MusementItem[]): void {
    this.WISHLIST_ADD(items);
  }

  /**
   * Remove a single item from the user's wishlist.
   * @param id
   */
  @Action
  removeSingle(id: string): void {
    this.WISHLIST_REMOVE([id]);
  }

  /**
   * Remove multiple items from the user's wishlist.
   * @param ids
   */
  @Action
  removeMultiple(ids: string[]): void {
    this.WISHLIST_REMOVE(ids);
  }

  /**
   * Remove all the items present in the user's wishlist.
   */
  @Action
  clear(): void {
    this.WISHLIST_CLEAR();
  }
}

export default getModule(WishlistStore);
