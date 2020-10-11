import EventItemModel from '@/models/event.item';

/**
 * This interface describes the structure of the cart store.
 */
export default interface CartStoreModel {
  items: EventItemModel[];
  totalPrice: number;
}
