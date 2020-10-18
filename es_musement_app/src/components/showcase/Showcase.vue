<template>
  <div class="container" v-if="items && items.length">
    <template v-if="paginatorActive">
      <div class="pagination_wrapper">
        <ul class="product-list">
          <li class="product-list__item" v-for="(item, index) in items" v-bind:key="item.id">
            <keep-alive :max="20">
              <EventItemCard
                :item="item"
                :detect-network-speed="index === 0"
                :image-quality="imageQuality"
                v-on:slowNetwork="slowConnectionDetected()"
                v-on:fastNetwork="fastConnectionDetected()"
              >
              </EventItemCard>
            </keep-alive>
          </li>
        </ul>
        <Pagination
          :currentPage="currentPage"
          v-on:changePage="loadPage"
          :has-next="hasNextPage"
        ></Pagination>
      </div>
    </template>

    <template v-else>
      <div class="scroll_wrapper">
        <ul class="product-list">
          <li class="product-list__item" v-for="(item, index) in items" v-bind:key="index">
            <EventItemCard :item="item"></EventItemCard>
          </li>
        </ul>
        <infinite-loading @infinite="infiniteHandler($event)">
          <div slot="no-more">...</div>
          <div slot="no-results">...</div>
        </infinite-loading>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Pagination from "@/components/commons/Pagination.vue";
import { HttpCommon } from "@/http-common";
import InfiniteLoading from "vue-infinite-loading";
import EventItemCard from "@/components/showcase/elements/EventItemCard.vue";
import AppUtils from "@/utils/app-utils";
import EventItem from "@/models/event.item";
import { MusementItem } from "@/models/musement.models";
import { ShowcaseStoreInterface } from "@/store/showcase/showcase-store.model";
import { UserStoreInterface } from "@/store/user/user-store.model";
import { getModule } from "vuex-module-decorators";
import ShowcaseStore from "@/store/showcase/showcase-store";
import UserDataStore from "@/store/user/user-data-store";

@Component({
  components: { EventItemCard, Pagination, InfiniteLoading }
})
export default class Showcase extends Vue {
  showcaseStore: ShowcaseStoreInterface = getModule(ShowcaseStore);
  userStore: UserStoreInterface = getModule(UserDataStore);

  /** Retrieve the element of the page provided as input */
  public async loadPage(pageNumber: number): Promise<void> {
    await this.showcaseStore.moveToPage(pageNumber);
  }

  /** True if there is another page available */
  get hasNextPage() {
    return this.showcaseStore.nextPageAvailable;
  }

  /** Items that should be displayed in the page*/
  get items(): EventItem[] {
    return this.showcaseStore.pageItems;
  }

  get imageQuality(): number {
    return this.showcaseStore.imageQuality;
  }

  /** Current page displayed */
  get currentPage(): number {
    return this.showcaseStore.currentPage;
  }

  /** True if the paginator should be visible in the view */
  get paginatorActive(): boolean {
    return this.showcaseStore.showcaseViewType === "paginated";
  }

  /** Handle the infinite scroll logic. Retrieve new elements (if available) each time
   *  the user scroll to tbe bottom of the list */
  infiniteHandler($state: { loaded: () => void; complete: () => void }) {
    const numElements = 6;
    const offset: number = this.items.length === 0 ? 0 : (this.currentPage + 1) * numElements;
    this.updateItemsScrollView(numElements, offset, $state);
  }

  /** Retrieve the new items for the scroll view */
  updateItemsScrollView(
    numElements: number,
    offset: number,
    $state: { loaded: () => void; complete: () => void }
  ) {
    HttpCommon.getEventItems({
      limit: numElements,
      offset,
      currency: this.userStore.currency,
      language: this.userStore.language,
      callback: (data: MusementItem[]) => this.handleNewScrollListItems(data, $state)
    });
  }

  /** Call back once the list of new item is available */
  handleNewScrollListItems(
    data: MusementItem[],
    $state: { loaded: () => void; complete: () => void }
  ): void {
    if (data.length) {
      const items = data.map(AppUtils.fromMusementItemToEventItem);
      this.showcaseStore.ADD_PAGE_ITEMS(items);
      this.showcaseStore.UPDATE_PAGE_NUMBER(this.currentPage + 1);
      $state.loaded();
    } else {
      $state.complete();
    }
  }

  slowConnectionDetected() {
    this.showcaseStore.slowNetworkDetected();
  }

  fastConnectionDetected() {
    this.showcaseStore.fastNetworkDetected();
  }
}
</script>

<style lang="scss" scoped>
.change-view-btn-wrapper {
  text-align: right;

  .change-view-btn {
    padding: 0.4em;
    background-color: snow;
    color: black;
    cursor: pointer;
    border: 1px solid mediumaquamarine;

    &:hover {
      background: mediumaquamarine;
      color: snow;
    }
  }
}

.product-list {
  display: flex;
  flex: 0 1 auto;
  flex-flow: row wrap;
  margin: 0 -10px;
  align-items: center;
  justify-content: center;
}

.product-list__item {
  padding: 10px;
  max-width: 370px;
}
</style>
