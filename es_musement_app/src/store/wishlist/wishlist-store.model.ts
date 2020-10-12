import EventItem from "@/models/event.item";

/**
 * This interface describes the structure of the user wishlist store.
 */
export interface WishlistStoreModel {
  items: EventItem[];
}

/**
 * This interface describes the methods exposes by the class WishlistStore.
 */
export interface WishlistStoreInterface {
  getItems: EventItem[];
  numberOfItems: number;
  getItemsIds: string[];
  toggleItem: (item: EventItem) => Promise<void>;
  addSingle: (item: EventItem) => Promise<void>;
  addMultiple: (items: EventItem[]) => Promise<void>;
  removeSingle: (item: string) => Promise<void>;
  removeMultiple: (items: string[]) => Promise<void>;
  clear: () => Promise<void>;
  updateItems: (items: EventItem[]) => Promise<void>;
}
