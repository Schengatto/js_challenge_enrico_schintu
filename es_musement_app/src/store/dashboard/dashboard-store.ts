import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {MusementItem} from "@/models/musement.models";
import {HttpCommon} from "@/http-common";
import {AxiosResponse} from "axios";
import {PAGE_SIZE} from "@/constants/app.constant";
import DashboardStoreModel from "@/store/dashboard/dashboard-store.model";
import {isMobile} from "mobile-device-detect";
import store from "@/store";
import cartStore from "@/store/cart/cart-store";
import wishlistStore from "@/store/wishlist/wishlist-store";
import AppUtils from "@/utils/app-utils";
import EventItem from "@/models/event.item";

const INIT_STATE: DashboardStoreModel = {
  items: [],
  currentPage: 0,
  dashboardView: isMobile ? 'scroll' : 'paginated'
};

@Module({
  dynamic: true,
  namespaced: true,
  name: "dashboard",
  store
})
class DashboardStore extends VuexModule {
  dashboardStore: DashboardStoreModel = {...INIT_STATE};

  userCartData = cartStore;

  wishlistStore = wishlistStore;

  /**
   * The items present in the current page of the dashboard.
   */
  get pageItems(): EventItem[] {
    return this.dashboardStore.items;
  }

  /**
   * The current page displayed in the dashboard.
   */
  get currentPage(): number {
    return this.dashboardStore.currentPage;
  }

  /**
   * The current dashboard view. Possible values are 'scroll' or 'paginated'.
   */
  get dashboardViewType(): string {
    return this.dashboardStore.dashboardView;
  }

  /**
   * Update the page and the list of items present in the dashboard.
   * @param newState
   */
  @Mutation
  async UPDATE_PAGE_ITEMS(newState: DashboardStoreModel) {
    this.dashboardStore = {
      dashboardView: newState.dashboardView,
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
    this.dashboardStore.items = [...this.dashboardStore.items, ...items];
  }

  /**
   * Update the current dashboard page number.
   * @param pageNumber
   */
  @Mutation
  async UPDATE_PAGE_NUMBER(pageNumber: number) {
    this.dashboardStore.currentPage = pageNumber;
  }

  /**
   * Restore the initial state of the dashboard page.
   */
  @Mutation
  async CLEAR() {
    this.dashboardStore = {...INIT_STATE};
  }

  /**
   * Update the dashboard view. Possible values are 'scroll' or 'paginated'.
   * @param viewType
   */
  @Mutation
  async CHANGE_DASHBOARD_VIEW(viewType: string) {
    this.dashboardStore.dashboardView = viewType;
  }

  /**
   * This method handles the page change action. It will contact the endpoint that provide the
   * list of item that should be displayed at the page provided as argument of the method.
   * @param pageNumber
   */
  @Action
  async moveToPage(pageNumber: number) {
    HttpCommon.getEventItems(PAGE_SIZE, pageNumber * PAGE_SIZE)
      .then((response: AxiosResponse<MusementItem[]>) => {
        if (response.data) {
          const data: DashboardStoreModel = {
            items: [...response.data.map(AppUtils.fromMusementItemToEventItem)],
            currentPage: pageNumber,
            dashboardView: this.dashboardStore.dashboardView
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
  async updateDashboardView(viewType: string) {
    await this.dashboardReset();
    await this.CHANGE_DASHBOARD_VIEW(viewType);
  }

  /**
   * Reset the store status.
   */
  @Action
  async dashboardReset() {
    await this.CLEAR();
    await this.moveToPage(0)
  }

  @Action
  async updateItems() {
    HttpCommon.getEventItems(100, 0)
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

export default getModule(DashboardStore);
