import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import UserDataModel from "@/models/user-data.model";
import store from "@/store";
import i18n from "@/i18n";
import { UserStoreInterface, UserStoreModel } from "@/store/user/user-store.model";
import ShowcaseStore from "@/store/showcase/showcase-store";

const STORAGE_KEY = "APP_USER_DATA_STORE";
const USER_STORE_INIT_STATE: UserStoreModel = {
  userData: { username: "John Doe", email: "johnDoe@test.org" },
  currency: "EUR",
  language: "it"
};
const persistOnLocalStorage = (userStore: UserStoreModel) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userStore));
const loadFromLocalStorage: () => any = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) as string);

const dashboardStore = getModule(ShowcaseStore);

@Module({
  dynamic: true,
  namespaced: true,
  name: "user",
  store
})
export default class UserStore extends VuexModule implements UserStoreInterface {
  userStore: UserStoreModel = loadFromLocalStorage() || USER_STORE_INIT_STATE;

  /**
   * Return the information of the current user.
   */
  get userData(): UserDataModel | null {
    return this.userStore.userData;
  }

  /**
   * Return the current currency of the user.
   */
  get currency(): string {
    return this.userStore.currency;
  }

  /**
   * Return the current language of the user.
   */
  get language(): string {
    return this.userStore.language;
  }

  /**
   * User login action logic.
   * @param user
   */
  @Action
  async doLogin(user: UserDataModel) {
    await this.USER_LOGIN(user);
  }

  /**
   * User logout action logic.
   */
  @Action
  async doLogout() {
    await this.USER_LOGOUT();
  }

  /**
   * Change the current currency of the user to the one provided as argument.
   * @param currency
   */
  @Action
  async changeCurrency(currency: string) {
    await this.CHANGE_CURRENCY(currency);
  }

  /**
   * Change the current language of the user to the one provided as argument.
   * @param language
   */
  @Action
  async changeLanguage(language: string) {
    await this.CHANGE_LANGUAGE(language);
  }

  /**
   * Post-login logic that add the user information in the user store.
   * Then this method saves the store status in the browser localstorage.
   * @param user
   */
  @Mutation
  async USER_LOGIN(user: UserDataModel) {
    this.userStore.userData = { ...user };
    persistOnLocalStorage(this.userStore);
  }

  /**
   * Post-logout logic that add the user information in the user store.
   * Then this method saves the store status in the browser localstorage.
   */
  @Mutation
  async USER_LOGOUT() {
    this.userStore.userData = null;
    persistOnLocalStorage(this.userStore);
  }

  /**
   * Change the currency of the user.
   * Then this method saves the store status in the browser localstorage.
   * @param currency
   */
  @Mutation
  async CHANGE_CURRENCY(currency: string) {
    this.userStore.currency = currency;
    persistOnLocalStorage(this.userStore);
    await dashboardStore.updateItems();
    await dashboardStore.storeReset();
  }

  /**
   * Change the language of the user.
   * Then this method saves the store status in the browser localstorage.
   * @param language
   */
  @Mutation
  async CHANGE_LANGUAGE(language: string) {
    this.userStore.language = language;
    i18n.locale = language;
    persistOnLocalStorage(this.userStore);
    await dashboardStore.updateItems();
    await dashboardStore.storeReset();
  }
}
