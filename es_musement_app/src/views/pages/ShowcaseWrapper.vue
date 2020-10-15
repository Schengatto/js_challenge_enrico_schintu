<template v-if="showcaseStore">
  <div id="showcase_wrapper">
    <showcase></showcase>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Pagination from "@/components/commons/Pagination.vue";
import InfiniteLoading from "vue-infinite-loading";
import EventItemCard from "@/components/showcase/elements/EventItemCard.vue";
import ShowcaseStore from "@/store/showcase/showcase-store";
import { getModule } from "vuex-module-decorators";
import { ShowcaseStoreInterface } from "@/store/showcase/showcase-store.model";
import Showcase from "@/components/showcase/Showcase.vue";
import AppUtils from "@/utils/app-utils";
import AppDataStore from "@/store/app-data/app-data-store";

@Component({
  components: { Showcase, EventItemCard, Pagination, InfiniteLoading }
})
export default class ShowcaseWrapper extends Vue {
  showcaseStore: ShowcaseStoreInterface = getModule(ShowcaseStore);
  appDataStore: AppDataStore = getModule(AppDataStore);

  public created(): void {
    // Set the default showcase view based on mobile / desktop client.
    this.showcaseStore.updateShowcaseView(AppUtils.isMobile() ? "scroll" : "paginated");
  }

  /** Triggered each time a menu is opened. When the side menu is open then the body scroll bar should be hidden.*/
  @Watch("appDataStore.currentActiveMenu", { immediate: true })
  currentPageChanged(updatedValue: string): void {
    updatedValue === "NONE" ? this.enableBodyOverflow() : this.disableBodyOverflow();
  }

  /** Set CSS of the property overflow body element to 'hidden' */
  disableBodyOverflow(): void {
    const target: HTMLBodyElement | null = document.querySelector("body");
    target ? (target.style.overflow = "hidden") : null;
  }

  /** Set CSS of the property overflow body element to 'scroll' */
  enableBodyOverflow(): void {
    const target: HTMLBodyElement | null = document.querySelector("body");
    target ? (target.style.overflow = "auto") : null;
  }
}
</script>

<style lang="scss" scoped>
#showcase_wrapper {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
}
</style>
