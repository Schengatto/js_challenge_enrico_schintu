/**
 * This interface describes the structure of the app-data store.
 */
export interface AppDataStoreModel {
  currentMenu: string;
}

/**
 * This interface describes the methods exposes by the class AppDataStore.
 */
export interface AppDataStoreInterface {
  addDataStorage: AppDataStoreModel;
  currentActiveMenu: string;
  changeActiveMenu: (menu: string) => Promise<void>;
}
