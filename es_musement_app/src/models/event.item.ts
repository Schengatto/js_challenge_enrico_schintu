export default interface EventItem {
  id?: number;
  uuid: string;
  title: string;
  description: string;
  image: string;
  originalPrice: number;
  finalPrice: number;
  finalPriceFormatted: string;
  discounted: boolean;
  tickets: number;
}
