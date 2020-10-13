<template v-if="showcaseStore">
  <div id="showcase_wrapper">
    <showcase></showcase>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Pagination from "@/components/commons/Pagination.vue";
import InfiniteLoading from "vue-infinite-loading";
import { isMobile } from "mobile-device-detect";
import EventItemCard from "@/components/showcase/elements/EventItemCard.vue";
import ShowcaseStore from "@/store/showcase/showcase-store";
import { getModule } from "vuex-module-decorators";
import { ShowcaseStoreInterface } from "@/store/showcase/showcase-store.model";
import Showcase from "@/components/showcase/Showcase.vue";
import AppUtils from "@/utils/app-utils";

@Component({
  components: { Showcase, EventItemCard, Pagination, InfiniteLoading }
})
export default class ShowcaseWrapper extends Vue {
  showcaseStore: ShowcaseStoreInterface = getModule(ShowcaseStore);

  public created(): void {
    this.showcaseStore.updateShowcaseView(isMobile ? "scroll" : "paginated");
  }

  get isMobile(): boolean {
    return AppUtils.isMobile();
  }
}
</script>
