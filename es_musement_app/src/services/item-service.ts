import dashboardStore from "@/store/dashboard/dashboard-store.ts";
import { MusementItem } from "@/models/musement.models";

export class ItemService {
  public static retrieveItems(pageNumber: number): void {
    dashboardStore.moveToPage(pageNumber);
  }

  get getItems(): MusementItem[] {
    return dashboardStore.pageItems;
  }
}
