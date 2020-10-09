import { MusementItem } from "@/models/musement.models";
import Page from "@/models/pagination.model";

/**
 * This interface describes the structure of the dashboard store.
 */
export default interface DashboardStoreModel {
  items: MusementItem[];
  currentPage: Page;
}
