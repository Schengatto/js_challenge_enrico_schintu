import UserStoreModel from "@/store/user/user-store.model";

export const JWT_TOKEN_KEY = "JWT_TOKEN";
export const USERNAME_TOKEN_KEY = "USERNAME_TOKEN";

export const X_AUTH_TOKEN = "X_AUTH_TOKEN";

export const PAGE_SIZE = 6;

export const USER_STORE_INIT_STATE: UserStoreModel = {
  userData: {username: 'John Doe', email: 'johnDoe@test.org'},
  currency: 'EUR',
  language: 'it'
};
