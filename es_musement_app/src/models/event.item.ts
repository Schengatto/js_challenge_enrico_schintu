export default interface EventItem {
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
