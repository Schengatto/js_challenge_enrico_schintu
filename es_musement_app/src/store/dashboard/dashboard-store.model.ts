import { MusementItem } from "@/models/musement.models";

/**
 * This interface describes the structure of the dashboard store.
 */
export default interface DashboardStoreModel {
  items: MusementItem[];
  currentPage: number;
  dashboardView: string;
}
