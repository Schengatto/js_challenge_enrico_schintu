import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {MusementItem} from "@/models/musement.models";
import store from "@/store";
import Page from "@/models/pagination.model";
import {API_SUFFIX, HttpCommon} from "@/http-common";
import {AxiosResponse} from "axios";
import {PAGE_SIZE} from "@/constants/app.constant";
import DashboardStoreModel from "@/store/dashboard/dashboard-store.model";
import userStore from "@/store/user/user-store";

const INIT_STATE: DashboardStoreModel = {
  items: [],
  currentPage: {page: 0, size: PAGE_SIZE}
};

@Module({
  dynamic: true,
  namespaced: true,
  name: "dashboard",
  store
})
class DashboardStore extends VuexModule {
  dashboardStore: DashboardStoreModel = {...INIT_STATE};

  /**
   * The items present in the current page of the dashboard.
   */
  get pageItems(): MusementItem[] {
    return this.dashboardStore.items;
  }

  /**
   * The current page displayed in the dashboard.
   */
  get currentPage(): Page {
    return this.dashboardStore.currentPage;
  }

  /**
   * Update the page and the list of items present in the dashboard.
   * @param newState
   */
  @Mutation
  UPDATE_PAGE(newState: DashboardStoreModel): void {
    this.dashboardStore = {...newState};
  }

  /**
   * Restore the initial state of the dashboard page.
   */
  @Mutation
  CLEAR(): void {
    this.dashboardStore = {...INIT_STATE};
  }

  /**
   * This method handles the page change action. It will contact the endpoint that provide the
   * list of item that should be displayed at the page provided as argument of the method.
   * @param pageNumber
   */
  @Action
  moveToPage(pageNumber: number): void {
    const headers = {
      'accept-language': userStore.language,
      'content-type': 'application/json',
      'x-musement-currency': userStore.currency,
      'x-musement-version': '3.4.0'
    };
    HttpCommon.getApi(headers)
      .get(
        API_SUFFIX, {
          params: {
            limit: PAGE_SIZE,
            offset: pageNumber * PAGE_SIZE
          }
        }
      )
      .then((response: AxiosResponse<MusementItem[]>) => {
        if (response.data) {
          const data = {
            items: [...response.data],
            currentPage: {page: pageNumber, size: PAGE_SIZE}
          };
          this.UPDATE_PAGE(data);
        } else {
          throw Error("No data found in the response");
        }
      })
      .catch(error => console.error);
  }

  /**
   * This method force the reload of the current page.
   * It should be used for stuff like language change or currency change.
   */
  @Action
  reloadCurrentPage(): void {
    this.moveToPage(this.currentPage.page);
  }

  /**
   * Reset the store status.
   */
  @Action
  cleanItems(): void {
    this.CLEAR();
  }
}

export default getModule(DashboardStore);
