import {MusementItem} from "@/models/musement.models";

/**
 * This interface describes the structure of the user wishlist store.
 */
export default interface WishlistStoreModel {
  items: MusementItem[];
}
