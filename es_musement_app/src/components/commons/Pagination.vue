<template>
  <nav class="pagination">
    <ul class="pagination__list">
      <li class="pagination__item" v-if="currentPage >= 1">
        <a href="#" class="pagination__link" @click.prevent="previousPage()">
          <CustomIcon title="Previous Page" type="left-arrow"></CustomIcon>
        </a>
      </li>
      <li class="pagination__item" v-if="currentPage > 1">
        <a href="#" class="pagination__link" @click="loadPage(0)">
          1
        </a>
      </li>
      <li class="pagination__item" v-if="currentPage > 1">
        <div class="pagination__dots">
          ...
        </div>
      </li>
      <li class="pagination__item" v-for="p in pages" v-bind:key="p">
        <a href="#" class="pagination__link" @click="loadPage(p - 1)">
          <span v-if="p !== currentPage + 1">{{ p }}</span>
          <span v-else>
            <strong>{{ p }}</strong>
          </span>
        </a>
      </li>
      <li class="pagination__item" v-if="currentPage < lastPageIndex - 3">
        <div class="pagination__dots">
          ...
        </div>
      </li>
      <li class="pagination__item" v-if="currentPage < lastPageIndex - 2">
        <a
          href="#"
          class="pagination__link"
          @click="loadPage(lastPageIndex - 1)"
        >
          {{ lastPageIndex }}
        </a>
      </li>
      <li class="pagination__item" v-if="currentPage < lastPageIndex - 1">
        <a href="#" class="pagination__link" @click.prevent="nextPage()">
          <CustomIcon title="Next Page" type="right-arrow"></CustomIcon>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CustomIcon from "@/components/commons/CustomIcon.vue";

const PAGES_LINKS_NUMBER = 3;

@Component({
  components: { CustomIcon }
})
export default class Pagination extends Vue {
  @Prop() currentPage!: number;
  @Prop({ default: 10 }) lastPageIndex!: number;
  pages: number[] = [];

  @Watch("currentPage", { immediate: true })
  currentPageChanged(updatedValue: number): void {
    const startIndex = updatedValue < 1 ? 0 : updatedValue - 1;
    this.initPagesRange(startIndex);
  }

  public loadPage(pageNumber: number): void {
    this.$emit("changePage", pageNumber);
  }

  public previousPage(): void {
    this.loadPage(this.currentPage - 1);
  }

  public nextPage(): void {
    this.loadPage(this.currentPage + 1);
  }

  private initPagesRange(start: number): void {
    const startIndex = Math.min(start, this.lastPageIndex - PAGES_LINKS_NUMBER);
    const endIndex = Math.min(start + PAGES_LINKS_NUMBER, this.lastPageIndex);
    this.pages = [];
    for (let i = startIndex; i < endIndex; i++) {
      this.pages.push(i + 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination__dots {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444a59;
}
</style>
