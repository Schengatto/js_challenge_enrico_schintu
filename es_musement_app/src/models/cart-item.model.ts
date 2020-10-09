export default interface CartItemModel {
  uuid: string;
  title: string;
  image: string;
  originalPrice: number;
  finalPrice: number;
  discounted: boolean;
  tickets: number;
}
