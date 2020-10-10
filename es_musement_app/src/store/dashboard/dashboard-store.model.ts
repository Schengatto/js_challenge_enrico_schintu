import EventItem from "@/models/event.item";

/**
 * This interface describes the structure of the dashboard store.
 */
export default interface DashboardStoreModel {
  items: EventItem[];
  currentPage: number;
  dashboardView: string;
}
