import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { MusementItem } from "@/models/musement.models";
import { HttpCommon } from "@/http-common";
import { AxiosResponse } from "axios";
import { ShowcaseStoreInterface, ShowcaseStoreModel } from "@/store/showcase/showcase-store.model";
import { isMobile } from "mobile-device-detect";
import store from "@/store";
import AppUtils from "@/utils/app-utils";
import EventItem from "@/models/event.item";
import CartStore from "@/store/cart/cart-store";
import WishlistStore from "@/store/wishlist/wishlist-store";
import ApiRequestDataMode from "@/models/api-request-data.mode";

const INIT_STATE: ShowcaseStoreModel = {
  items: [],
  currentPage: 0,
  showcaseView: isMobile ? "scroll" : "paginated",
  nextPageAvailable: false,
  imageQuality: 90
};

@Module({
  dynamic: true,
  namespaced: true,
  name: "showcase",
  store
})
export default class ShowcaseStore extends VuexModule implements ShowcaseStoreInterface {
  showcaseStore: ShowcaseStoreModel = { ...INIT_STATE };
  private userCartData = getModule(CartStore);
  private wishlistStore = getModule(WishlistStore);

  /**
   * The items present in the current page of the dashboard.
   */
  get pageItems(): EventItem[] {
    return this.showcaseStore.items;
  }

  /**
   * The current page displayed in the dashboard.
   */
  get currentPage(): number {
    return this.showcaseStore.currentPage;
  }

  /**
   * Return the quality of the image displayed in the showcase page.
   */
  get imageQuality(): number {
    return this.showcaseStore.imageQuality;
  }

  /**
   * There is a next page available.
   */
  get nextPageAvailable() {
    return this.showcaseStore.nextPageAvailable;
  }

  /**
   * The current dashboard view. Possible values are 'scroll' or 'paginated'.
   */
  get showcaseViewType(): string {
    return this.showcaseStore.showcaseView;
  }

  /**
   * Update the page and the list of items present in the dashboard.
   * @param newState
   */
  @Mutation
  async UPDATE_PAGE_ITEMS(newState: ShowcaseStoreModel) {
    this.showcaseStore = {
      ...this.showcaseStore,
      showcaseView: newState.showcaseView,
      items: newState.items,
      currentPage: newState.currentPage,
      nextPageAvailable: newState.nextPageAvailable
    };
  }

  /**
   * Add items to the dashboard event list.
   * @param items
   */
  @Mutation
  async ADD_PAGE_ITEMS(items: EventItem[]) {
    this.showcaseStore.items = [...this.showcaseStore.items, ...items];
  }

  /**
   * Update the current dashboard page number.
   * @param pageNumber
   */
  @Mutation
  async UPDATE_PAGE_NUMBER(pageNumber: number) {
    this.showcaseStore.currentPage = pageNumber;
  }

  /**
   * Restore the initial state of the dashboard page.
   */
  @Mutation
  async CLEAR() {
    this.showcaseStore = { ...INIT_STATE };
  }

  /**
   * Restore the initial state of the dashboard page.
   */
  @Mutation
  async CLEAR_ITEMS_IMG() {
    const imageWithoutSrc = this.showcaseStore.items.map(ShowcaseStore.removeImageSrc);
    this.showcaseStore = { ...this.showcaseStore, items: [...imageWithoutSrc] };
  }

  /**
   * Update the dashboard view. Possible values are 'scroll' or 'paginated'.
   * @param viewType
   */
  @Mutation
  async CHANGE_DASHBOARD_VIEW(viewType: string) {
    this.showcaseStore.showcaseView = viewType;
  }

  /**
   * Change the image quality to load the showcase page faster.
   */
  @Mutation
  async SLOW_INTERNET_DETECTED() {
    const target = Math.max(20, this.showcaseStore.imageQuality - 20);
    console.debug("SLOW_INTERNET_DETECTED", target);
    this.showcaseStore = { ...this.showcaseStore, imageQuality: target };
  }

  /**
   * Change the image quality to load better images.
   */
  @Mutation
  async FAST_INTERNET_DETECTED() {
    const target = Math.min(100, this.showcaseStore.imageQuality + 20);
    console.debug("FAST_INTERNET_DETECTED", target);
    this.showcaseStore = { ...this.showcaseStore, imageQuality: target };
  }

  /**
   * This method handles the page change action. It will contact the endpoint that provide the
   * list of item that should be displayed at the page provided as argument of the method.
   * @param pageNumber
   */
  @Action
  async moveToPage(pageNumber: number) {
    await this.CLEAR_ITEMS_IMG();
    // await this.UPDATE_PAGE_NUMBER(pageNumber);
    const requestData: ApiRequestDataMode = {
      limit: 7,
      offset: pageNumber * 6
    };
    HttpCommon.getEventItems(requestData)
      .then((response: AxiosResponse<MusementItem[]>) => {
        const { limit, offset } = requestData;
        if (response.data) {
          const items = response.data;
          let hasNext = false;
          if (items.length === (limit ? limit : 7)) {
            hasNext = true;
            items.pop();
          }
          for (let i = 0; i < items.length; i++) {
            items[i].id = i + offset;
          }
          const data: ShowcaseStoreModel = {
            items: [...items.map(AppUtils.fromMusementItemToEventItem)],
            currentPage: pageNumber,
            showcaseView: this.showcaseStore.showcaseView,
            nextPageAvailable: hasNext,
            imageQuality: this.showcaseStore.imageQuality
          };
          this.UPDATE_PAGE_ITEMS(data);
        } else {
          throw Error("No data found in the response");
        }
      })
      .catch(() => console.error);
  }

  /**
   * This method force the reload of the current page.
   * It should be used for stuff like language change or currency change.
   */
  @Action
  async reloadCurrentPage() {
    await this.moveToPage(this.currentPage);
  }

  /**
   * Decrease the image quality in the showcase page to load the page faster.
   */
  @Action
  async slowNetworkDetected() {
    if (this.imageQuality > 30) {
      await this.SLOW_INTERNET_DETECTED();
    }
  }

  /**
   * Increase the image quality in the showcase page to load the page faster.
   */
  @Action
  async fastNetworkDetected() {
    if (this.imageQuality < 100) {
      await this.FAST_INTERNET_DETECTED();
    }
  }

  /**
   * Update the dashboard view. Possible values are 'scroll' or 'paginated'.
   * @param viewType
   */
  @Action
  async updateShowcaseView(viewType: string) {
    await this.storeReset();
    await this.CHANGE_DASHBOARD_VIEW(viewType);
  }

  /**
   * Reset the store status.
   */
  @Action
  async storeReset() {
    await this.CLEAR();
    await this.moveToPage(0);
  }

  /**
   *  This method should contact an API that return the current items with the updated data.
   *  @Example when the user change the language or the currency this method should contact the API
   *  to have the updated items back.
   *
   *  TODO: Actually this method is contacting the wrong API and so it may result incomplete.
   *  Assume this is done just for demonstrative purpose until a real endpoint is available for this kind of stuff.
   */
  @Action
  async updateItems() {
    const requestData: ApiRequestDataMode = {
      limit: 100,
      offset: 0
    };
    HttpCommon.updateEventItem(requestData)
      .then((response: AxiosResponse<MusementItem[]>) => {
        if (response.data) {
          const eventItems = response.data.map(AppUtils.fromMusementItemToEventItem);
          this.wishlistStore.updateItems(eventItems);
          this.userCartData.updateItems(eventItems);
        } else {
          throw Error("No data found in the response");
        }
      })
      .catch(() => console.error);
  }

  private static removeImageSrc(item: EventItem) {
    item.image = "";
    return item;
  }
}
