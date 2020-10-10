import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import UserDataModel from '@/models/user-data.model';
import UserStoreModel from '@/store/user/user-store.model';
import store from '@/store';
import dashboardStore from '@/store/dashboard/dashboard-store.ts';
import i18n from '@/i18n';

const STORAGE_KEY = 'APP_USER_DATA_STORE';
const USER_STORE_INIT_STATE: UserStoreModel = {
  userData: { username: 'John Doe', email: 'johnDoe@test.org' },
  currency: 'EUR',
  language: 'it',
};
const persistOnLocalStorage = (userStore: UserStoreModel) => localStorage.setItem(STORAGE_KEY, JSON.stringify(userStore));
const loadFromLocalStorage: () => any = () => JSON.parse(localStorage.getItem(STORAGE_KEY) as string);

@Module({
  dynamic: true,
  namespaced: true,
  name: 'user',
  store
})
class UserStore extends VuexModule {
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
  doLogin(user: UserDataModel): void {
    this.USER_LOGIN(user);
  }

  /**
   * User logout action logic.
   */
  @Action
  doLogout(): void {
    this.USER_LOGOUT();
  }

  /**
   * Change the current currency of the user to the one provided as argument.
   * @param currency
   */
  @Action
  changeCurrency(currency: string): void {
    this.CHANGE_CURRENCY(currency);
  }

  /**
   * Change the current language of the user to the one provided as argument.
   * @param language
   */
  @Action
  changeLanguage(language: string): void {
    this.CHANGE_LANGUAGE(language);
  }

  /**
   * Post-login logic that add the user information in the user store.
   * Then this method saves the store status in the browser localstorage.
   * @param user
   */
  @Mutation
  USER_LOGIN(user: UserDataModel): void {
    this.userStore.userData = {...user};
    persistOnLocalStorage(this.userStore);
  }

  /**
   * Post-logout logic that add the user information in the user store.
   * Then this method saves the store status in the browser localstorage.
   */
  @Mutation
  USER_LOGOUT(): void {
    this.userStore.userData = null;
    persistOnLocalStorage(this.userStore);
  }

  /**
   * Change the currency of the user.
   * Then this method saves the store status in the browser localstorage.
   * @param currency
   */
  @Mutation
  CHANGE_CURRENCY(currency: string): void {
    this.userStore.currency = currency;
    persistOnLocalStorage(this.userStore);
    dashboardStore.dashboardReset();
  }

  /**
   * Change the language of the user.
   * Then this method saves the store status in the browser localstorage.
   * @param language
   */
  @Mutation
  CHANGE_LANGUAGE(language: string): void {
    this.userStore.language = language;
    i18n.locale = language;
    persistOnLocalStorage(this.userStore);
    dashboardStore.dashboardReset();
  }


}

export default getModule(UserStore);
