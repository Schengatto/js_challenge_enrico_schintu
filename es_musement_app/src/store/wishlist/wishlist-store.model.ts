import EventItem from "@/models/event.item";

/**
 * This interface describes the structure of the user wishlist store.
 */
export default interface WishlistStoreModel {
  items: EventItem[];
}
