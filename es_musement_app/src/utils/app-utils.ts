import { MusementItem } from "@/models/musement.models";
import EventItemModel from "@/models/event.item";
import {
  isChrome,
  isChromium,
  isEdge,
  isEdgeChromium,
  isFirefox,
  isMobile,
  isMobileSafari,
  isSafari
} from "mobile-device-detect";

export default class AppUtils {
  /**
   * Transform the object of type {@link MusementItem} provided as argument
   * into a {@link EventItemModel}.The output object keeps just the relevant
   * information of the original object.
   * @param musementItem
   */
  public static fromMusementItemToEventItem(musementItem: MusementItem): EventItemModel {
    return {
      uuid: musementItem.uuid,
      description: musementItem.description,
      image: musementItem.cover_image_url,
      title: musementItem.title,
      discounted: musementItem.discount > 0,
      originalPrice: musementItem.original_retail_price.value,
      finalPrice: musementItem.retail_price.value,
      finalPriceFormatted: musementItem.retail_price.formatted_value,
      tickets: 1
    };
  }

  /**
   * Returns true if the user is using a mobile device.
   */
  static isMobile(): boolean {
    return isMobile;
  }

  /**
   * Returns true if the browser of the user is compatible with this application.
   */
  static isCompatibleBrowser(): boolean {
    return (
      isChrome || isFirefox || isEdge || isEdgeChromium || isSafari || isMobileSafari || isChromium
    );
  }
}
