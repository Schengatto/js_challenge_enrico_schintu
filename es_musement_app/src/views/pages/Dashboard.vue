<template>
  <div class="container" v-if="items.length">
    <template v-if="paginatorActive">
      <ul class="product-list">
        <li
          class="product-list__item"
          v-for="item in items"
          v-bind:key="item.uuid">
          <EventItem :item="item"></EventItem>
        </li>
      </ul>
      <Pagination :currentPage="currentPage"
                  v-on:changePage="loadPage">
      </Pagination>
    </template>

    <template v-else>
      <ul class="product-list">
        <li
          class="product-list__item"
          v-for="(item, index) in items"
          v-bind:key="index">
          <EventItem :item="item"></EventItem>
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
import { Component, Vue } from 'vue-property-decorator';
import EventItem from '@/components/dashboard/EventItem.vue';
import { MusementItem } from '@/models/musement.models';
import Pagination from '@/components/commons/Pagination.vue';
import { API_SUFFIX, HttpCommon } from '@/http-common';
import InfiniteLoading from 'vue-infinite-loading';
import dashboardStore from '@/store/dashboard/dashboard-store';
import { isMobile } from 'mobile-device-detect';

  @Component({
    components: { Pagination, EventItem, InfiniteLoading },
  })
export default class Dashboard extends Vue {
    private dashboardStore = dashboardStore;

    public created(): void {
      this.dashboardStore.updateDashboardView(isMobile ? 'scroll' : 'paginated');
    }

    public loadPage(pageNumber: number): void {
      this.dashboardStore.moveToPage(pageNumber);
    }

    get items(): MusementItem[] {
      return this.dashboardStore.pageItems;
    }

    get currentPage(): number {
      return this.dashboardStore.currentPage;
    }

    get paginatorActive(): boolean {
      return this.dashboardStore.dashboardViewType === 'paginated';
    }

    infiniteHandler($state: { loaded: () => void; complete: () => void }) {
      const offset: number = this.items.length === 0
        ? 0
        : (this.currentPage + 1) * 6;

      HttpCommon.getApi()
        .get(API_SUFFIX, { params: { limit: 6, offset } })
        .then(({ data }) => {
          if (data.length) {
            this.dashboardStore.ADD_PAGE_ITEMS(data);
            this.dashboardStore.UPDATE_PAGE_NUMBER(this.currentPage + 1);
            $state.loaded();
          } else {
            $state.complete();
          }
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
</style>
