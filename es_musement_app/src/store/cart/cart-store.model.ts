import EventItemModel from "@/models/event.item";
import EventItem from "@/models/event.item";

/**
 * This interface describes the structure of the cart store.
 */
export interface CartStoreModel {
  items: EventItemModel[];
  totalPrice: number;
}

/**
 * This interface describes the methods exposes by the class CartStore.
 */
export interface CartStoreInterface {
  getItems: EventItem[];
  numberOfTickets: number;
  totalAmount: number;
  getItemsIds: string[];
  addSingle: (item: EventItem) => Promise<void>;
  addMultiple: (items: EventItem[]) => Promise<void>;
  removeSingle: (item: string) => Promise<void>;
  removeMultiple: (items: string[]) => Promise<void>;
  clear: () => Promise<void>;
  updateItems: (items: EventItem[]) => Promise<void>;
}
