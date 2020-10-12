<template v-if="dashboardStore && userStore">
  <div class="container" v-if="items.length">
    <template v-if="paginatorActive">
      <ul class="product-list">
        <li class="product-list__item" v-for="item in items" v-bind:key="item.uuid">
          <EventItemCard :item="item"></EventItemCard>
        </li>
      </ul>
      <Pagination :currentPage="currentPage" v-on:changePage="loadPage"></Pagination>
    </template>

    <template v-else>
      <ul class="product-list">
        <li class="product-list__item" v-for="(item, index) in items" v-bind:key="index">
          <EventItemCard :item="item"></EventItemCard>
        </li>
      </ul>
      <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more">...</div>
        <div slot="no-results">...</div>
      </infinite-loading>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Pagination from "@/components/commons/Pagination.vue";
import { HttpCommon } from "@/http-common";
import InfiniteLoading from "vue-infinite-loading";
import { isMobile } from "mobile-device-detect";
import EventItemCard from "@/components/dashboard/EventItemCard.vue";
import AppUtils from "@/utils/app-utils";
import EventItem from "@/models/event.item";
import { MusementItem } from "@/models/musement.models";
import DashboardStore from "@/store/dashboard/dashboard-store";
import { getModule } from "vuex-module-decorators";
import { DashboardStoreInterface } from "@/store/dashboard/dashboard-store.model";
import { UserStoreInterface } from "@/store/user/user-store.model";
import UserStore from "@/store/user/user-store";

@Component({
  components: { EventItemCard, Pagination, InfiniteLoading }
})
export default class Dashboard extends Vue {
  dashboardStore: DashboardStoreInterface = getModule(DashboardStore);
  userStore: UserStoreInterface = getModule(UserStore);

  public created(): void {
    this.dashboardStore.updateDashboardView(isMobile ? "scroll" : "paginated");
  }

  public loadPage(pageNumber: number): void {
    this.dashboardStore.moveToPage(pageNumber);
  }

  get items(): EventItem[] {
    return this.dashboardStore.pageItems;
  }

  get currentPage(): number {
    return this.dashboardStore.currentPage;
  }

  get paginatorActive(): boolean {
    return this.dashboardStore.dashboardViewType === "paginated";
  }

  infiniteHandler($state: { loaded: () => void; complete: () => void }) {
    const numElements = 3;
    const offset: number = this.items.length === 0 ? 0 : (this.currentPage + 1) * numElements;

    const getItemsFromResponse = (data: MusementItem[]) => {
      if (data.length) {
        const items = data.map(AppUtils.fromMusementItemToEventItem);
        this.dashboardStore.ADD_PAGE_ITEMS(items);
        this.dashboardStore.UPDATE_PAGE_NUMBER(this.currentPage + 1);
        $state.loaded();
      } else {
        $state.complete();
      }
    };

    HttpCommon.getEventItems({
      limit: numElements,
      offset,
      currency: this.userStore.currency,
      language: this.userStore.language,
      callback: getItemsFromResponse
    });
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
