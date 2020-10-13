<template>
  <nav class="pagination unselectable">
    <ul class="pagination__list">
      <li class="pagination__item">
        <a
          id="previous_page_link"
          href="#"
          class="pagination__link"
          v-bind:class="{ disabled: currentPage < 1 }"
          @click.prevent="previousPage()"
        >
          <CustomIcon
            title="Previous Page"
            type="left-arrow"
            :clickable="currentPage > 0"
          ></CustomIcon>
        </a>
      </li>
      <li class="pagination__item" v-for="p in pages" v-bind:key="p">
        <a
          href="#"
          class="pagination__link"
          v-bind:class="{ active: p === currentPage + 1 }"
          @click.prevent="loadPage(p - 1)"
        >
          <span v-if="p !== currentPage + 1">{{ p }}</span>
          <span v-else>
            <strong>{{ p }}</strong>
          </span>
        </a>
      </li>
      <li class="pagination__item" v-if="hasNext">
        <a id="next_page_link" href="#" class="pagination__link" @click.prevent="nextPage()">
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

  @Prop({ default: false }) hasNext!: boolean;

  pages: number[] = [];

  private loadingPage = false;

  @Watch("currentPage", { immediate: true })
  currentPageChanged(updatedValue: number): void {
    const startIndex = updatedValue < 1 ? 0 : updatedValue - 1;
    this.initPagesRange(startIndex);
    this.loadingPage = false;
  }

  public async loadPage(pageNumber: number): Promise<void> {
    if (!this.loadingPage && pageNumber !== this.currentPage) {
      this.loadingPage = true;
      await this.$emit("changePage", pageNumber);
    }
  }

  public previousPage(): void {
    if (this.currentPage > 0) {
      this.loadPage(this.currentPage - 1);
    }
  }

  public nextPage(): void {
    this.loadPage(this.currentPage + 1);
  }

  private initPagesRange(start: number): void {
    const lastItemIndex = this.hasNext ? PAGES_LINKS_NUMBER - 1 : PAGES_LINKS_NUMBER - 2;
    const startIndex = Math.min(start, this.currentPage);
    const endIndex = this.currentPage + lastItemIndex;
    this.pages = [];
    for (let i = startIndex; i < endIndex; i += 1) {
      this.pages.push(i + 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  height: 45px;
  margin: 30px auto;
  text-align: center;
}

.pagination__list {
  height: 100%;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

.pagination__item {
  height: 100%;
  width: 45px;
  font-family: "Lato-Bold", sans-serif;
  font-size: 13px;
  letter-spacing: 1.39px;
  text-align: center;
}

.pagination__link {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444a59;

  &.active {
    cursor: context-menu;
  }
}

.pagination__link:hover {
  text-decoration: underline;
}

.pagination__link .icon {
  width: 8px;
  fill: #444a59;
}

.pagination__dots {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444a59;
  background-color: lightgray;
  border-radius: 0.8em;
}

.pagination__item {
  height: 100%;
  width: 40px;
  margin: 5px;
  font-family: "Lato-Bold", sans-serif;
  font-size: 13px;
  letter-spacing: 1.39px;
  text-align: center;

  .pagination__link {
    border: 1px solid mediumaquamarine;
    border-radius: 0.8em;

    &.disabled {
      background-color: var(--gray);
      border: 1px solid gray;
      cursor: context-menu;
    }
  }

  .active {
    background-color: mediumaquamarine;
    border-radius: 0.8em;
  }
}
</style>
