import UserDataModel from "@/models/user-data.model";

/**
 * This interface describes the structure of the user data store.
 */
export interface UserStoreModel {
  userData: UserDataModel | null;
  currency: string;
  language: string;
}

/**
 * This interface describes the methods exposes by the class UserStore.
 */
export interface UserStoreInterface {
  userStore: UserStoreModel;
  userData: UserDataModel | null;
  currency: string;
  language: string;
  changeCurrency: (currency: string) => Promise<void>;
  changeLanguage: (language: string) => Promise<void>;
}
