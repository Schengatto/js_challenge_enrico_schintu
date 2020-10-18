import EventItem from "@/models/event.item";

/**
 * This interface describes the structure of the showcase store.
 */
export interface ShowcaseStoreModel {
  items: EventItem[];
  currentPage: number;
  nextPageAvailable: boolean;
  showcaseView: string;
  imageQuality: number;
}

/**
 * This interface describes the methods exposes by the class Showcase.
 */
export interface ShowcaseStoreInterface {
  showcaseStore: ShowcaseStoreModel;
  pageItems: EventItem[];
  currentPage: number;
  nextPageAvailable: boolean;
  showcaseViewType: string;
  imageQuality: number;
  moveToPage: (index: number) => Promise<void>;
  reloadCurrentPage: () => Promise<void>;
  updateShowcaseView: (type: string) => Promise<void>;
  storeReset: () => Promise<void>;
  updateItems: () => Promise<void>;
  slowNetworkDetected: () => Promise<void>;
  fastNetworkDetected: () => Promise<void>;
  ADD_PAGE_ITEMS: (items: EventItem[]) => Promise<void>;
  UPDATE_PAGE_NUMBER: (index: number) => Promise<void>;
}
