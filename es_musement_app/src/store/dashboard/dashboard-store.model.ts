import EventItem from "@/models/event.item";

/**
 * This interface describes the structure of the dashboard store.
 */
export interface DashboardStoreModel {
  items: EventItem[];
  currentPage: number;
  dashboardView: string;
}

/**
 * This interface describes the methods exposes by the class DashboardStore.
 */
export interface DashboardStoreInterface {
  dashboardStore: DashboardStoreModel;
  pageItems: EventItem[];
  currentPage: number;
  dashboardViewType: string;
  moveToPage: (index: number) => Promise<void>;
  reloadCurrentPage: () => Promise<void>;
  updateDashboardView: (type: string) => Promise<void>;
  dashboardReset: () => Promise<void>;
  updateItems: () => Promise<void>;
  ADD_PAGE_ITEMS: (items: EventItem[]) => Promise<void>;
  UPDATE_PAGE_NUMBER: (index: number) => Promise<void>;
}
