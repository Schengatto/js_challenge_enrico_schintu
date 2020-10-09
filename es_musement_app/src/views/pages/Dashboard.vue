<template>
  <div class="container">
    <ul class="product-list">
      <li
        class="product-list__item"
        v-for="item in items"
        v-bind:key="item.uuid">
        <EventItem :item="item"></EventItem>
      </li>
    </ul>
    <Pagination :currentPage="currentPage.page"
                v-on:changePage="loadPage"
    ></Pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ItemService } from '@/services/item-service';
import EventItem from '@/components/dashboard/EventItem.vue';
import { MusementItem } from '@/models/musement.models';
import Pagination from '@/components/commons/Pagination.vue';
import Page from '@/models/pagination.model';
import dashboardStore from '@/store/dashboard/dashboard-store';

  @Component({
    components: { Pagination, EventItem },
  })
export default class Dashboard extends Vue {
  public created(): void {
    this.loadPage(0);
  }

  public loadPage(pageNumber: number): void {
    ItemService.retrieveItems(pageNumber);
  }

  get items(): MusementItem[] {
    return dashboardStore.pageItems;
  }

  get currentPage(): Page {
    return dashboardStore.currentPage;
  }
}
</script>

<style scoped></style>
