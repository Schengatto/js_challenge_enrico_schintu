<template>
  <div class="container">
    <div class="change-view-btn-wrapper">
      <button class="change-view-btn" @click="toggleView()">Change View</button>
    </div>
    <template v-if="paginatorActive">
      <ul class="product-list">
        <li
          class="product-list__item"
          v-for="item in items"
          v-bind:key="item.uuid">
          <EventItem :item="item"></EventItem>
        </li>
      </ul>
      <Pagination :currentPage="currentPage.page"
                  v-on:changePage="loadPage">
      </Pagination>
    </template>

    <template v-else>
      <ul class="product-list">
        <li
          class="product-list__item"
          v-for="item in items"
          v-bind:key="item.uuid">
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
import Page from '@/models/pagination.model';
import { API_SUFFIX, HttpCommon } from '@/http-common';
import InfiniteLoading from 'vue-infinite-loading';
import dashboardStore from '@/store/dashboard/dashboard-store';
import { isMobile } from 'mobile-device-detect';

const api = '//hn.algolia.com/api/v1/search_by_date?tags=story';

  @Component({
    components: { Pagination, EventItem, InfiniteLoading },
  })
export default class Dashboard extends Vue {
    public paginatorActive = !isMobile;

    private dashboardStore = dashboardStore;

    private pageNumber = 0;

    public created(): void {
      if (this.paginatorActive) {
        this.loadPage(this.pageNumber);
      }
    }

    public loadPage(pageNumber: number): void {
      this.dashboardStore.moveToPage(pageNumber);
    }

    get items(): MusementItem[] {
      return this.dashboardStore.pageItems;
    }

    get currentPage(): Page {
      return this.dashboardStore.currentPage;
    }

    toggleView() {
      this.paginatorActive = !this.paginatorActive;
      if (this.paginatorActive) {
        this.loadPage(0);
      } else {
        this.dashboardStore.cleanItems();
      }
    }

    infiniteHandler($state: { loaded: () => void; complete: () => void }) {
      HttpCommon.getApi({})
        .get(API_SUFFIX, { params: { limit: 9, offset: this.pageNumber * 12 } })
        .then(({ data }) => {
          if (data.length) {
            this.pageNumber += 1;
            this.items.push(...data);
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
