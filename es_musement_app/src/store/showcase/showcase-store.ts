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
  showcaseView: isMobile ? "scroll" : "paginated"
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
      showcaseView: newState.showcaseView,
      items: newState.items,
      currentPage: newState.currentPage
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
   * Update the dashboard view. Possible values are 'scroll' or 'paginated'.
   * @param viewType
   */
  @Mutation
  async CHANGE_DASHBOARD_VIEW(viewType: string) {
    this.showcaseStore.showcaseView = viewType;
  }

  /**
   * This method handles the page change action. It will contact the endpoint that provide the
   * list of item that should be displayed at the page provided as argument of the method.
   * @param pageNumber
   */
  @Action
  async moveToPage(pageNumber: number) {
    const requestData: ApiRequestDataMode = {
      limit: 6,
      offset: pageNumber * 6
    };
    HttpCommon.getEventItems(requestData)
      .then((response: AxiosResponse<MusementItem[]>) => {
        if (response.data) {
          const data: ShowcaseStoreModel = {
            items: [...response.data.map(AppUtils.fromMusementItemToEventItem)],
            currentPage: pageNumber,
            showcaseView: this.showcaseStore.showcaseView
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
    HttpCommon.getEventItems(requestData)
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
}
