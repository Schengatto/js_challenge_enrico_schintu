import UserDataModel from "@/models/user-data.model";

/**
 * This interface describes the structure of the user data store.
 */
export default interface UserStoreModel {
  userData: UserDataModel | null;
  currency: string;
  language: string;
}
