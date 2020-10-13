import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { AppDataStoreModel, AppDataStoreInterface } from "@/store/app-data/app-data-store-model";

@Module({
  dynamic: true,
  namespaced: true,
  name: "appdata",
  store
})
export default class AppDataStore extends VuexModule implements AppDataStoreInterface {
  addDataStorage: AppDataStoreModel = { currentMenu: "NONE" };

  /**
   * Return the information of the current user.
   */
  get currentActiveMenu(): string {
    return this.addDataStorage.currentMenu;
  }

  /**
   * Change the current active menu.
   * @param menu
   */
  @Action
  async changeActiveMenu(menu: string) {
    await this.CHANGE_ACTIVE_MENU(menu);
  }

  /**
   * Change the current active menu.
   * @param menu
   */
  @Mutation
  async CHANGE_ACTIVE_MENU(menu: string) {
    this.addDataStorage.currentMenu = menu;
  }
}
