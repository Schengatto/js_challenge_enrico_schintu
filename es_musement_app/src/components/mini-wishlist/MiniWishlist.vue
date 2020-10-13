<template>
  <div id="mini_wishlist_wrapper" v-bind:class="{ active: showMenu }">
    <div class="wishlist-icon clickable" @click="toggleMenu()">
      <CustomIcon
        title="My Wishlist"
        type="wishlist"
        width="35px"
        height="35px"
        :color="iconColor"
      ></CustomIcon>
      <div v-if="numberOfItems" class="item__counter">{{ numberOfItems }}</div>
    </div>
    <div class="menu-container" v-if="showMenu">
      <div class="close-menu-btn clickable" @click="closeMenu()">x</div>
      <template v-if="numberOfItems">
        <div class="list-container">
          <div v-for="i in wishListItems" v-bind:key="i.uuid" class="menu-event-item">
            <div class="bag-item-info">
              <ImageWrapper
                width="75"
                height="50"
                :src="i.image"
                :title="i.title"
                src-height="40"
                src-width="65"
                quality="50"
              ></ImageWrapper>
              <div>
                <div>{{ i.title }}</div>
              </div>
              <div class="item-remove-wrapper">
                <div class="item-remove-icon" @click="removeItem(i.uuid)">x</div>
              </div>
            </div>
          </div>
        </div>

        <div class="menu-footer">
          <div class="menu-footer-btn clickable" @click="clearWishList">
            {{ $t("wishlist.remove.all") }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="empty-list">{{ $t("wishlist.emptylist.label") }}</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomIcon from "@/components/commons/CustomIcon.vue";
import EventItem from "@/models/event.item";
import { getModule } from "vuex-module-decorators";
import WishlistStore from "@/store/wishlist/wishlist-store";
import AppDataStore from "@/store/app-data/app-data-store";
import { AppDataStoreInterface } from "@/store/app-data/app-data-store-model";
import { WishlistStoreInterface } from "@/store/wishlist/wishlist-store.model";
import ImageWrapper from "@/components/commons/ImageWrapper.vue";

@Component({
  components: { ImageWrapper, CustomIcon }
})
export default class MiniWishlist extends Vue {
  private wishlistStore: WishlistStoreInterface = getModule(WishlistStore);

  private appDataStore: AppDataStoreInterface = getModule(AppDataStore);

  private timeout!: NodeJS.Timeout;

  get showMenu(): boolean {
    return this.appDataStore.currentActiveMenu === "WISHLIST";
  }

  get numberOfItems(): number {
    return this.wishlistStore.numberOfItems;
  }

  get wishListItems(): EventItem[] {
    return this.wishlistStore.getItems;
  }

  get iconColor(): string {
    return this.showMenu ? "snow" : "#143c53";
  }

  clearWishList(): void {
    this.wishlistStore.clear();
  }

  toggleMenu(): void {
    if (this.showMenu) {
      this.closeMenu();
    } else {
      this.appDataStore.changeActiveMenu("WISHLIST");
    }
  }

  closeMenu(): void {
    this.appDataStore.changeActiveMenu("NONE");
  }

  removeItem(id: string): void {
    this.wishlistStore.removeSingle(id);
  }
}
</script>

<style lang="scss" scoped>
#mini_wishlist_wrapper {
  padding: 0.3em 1em 2em 1.2em;
  margin: 0;
  border-radius: 2em 0 0 0;
  border: 1px solid transparent;
  border-right: none;
  border-bottom: none;
  height: 4.5em;

  @media screen and (max-height: 700px) {
    .menu-container {
      width: 100%;

      .list-container {
        max-height: 260px;
      }
    }
  }

  &.active {
    border: 1px solid var(--darkblue);
    border-right: none;
    border-bottom: none;
    border-color: var(--white);
    background-color: var(--darkblue);
  }

  .wishlist-icon {
    height: 25px;
    display: flex;
    align-items: flex-end;
    position: relative;
    margin-right: 10px;

    .icon {
      fill: #444a59;
    }

    .item__counter {
      position: absolute;
      left: 3em;
      top: 0;
      width: 15px;
      height: 15px;
      margin-left: -1px;
      display: flex;
      align-self: flex-start;
      justify-content: center;
      align-items: center;
      font-family: "Lato-Bold", sans-serif;
      font-size: 8px;
      text-align: center;
      border-radius: 50%;
      color: var(--darkblue);
      background-color: var(--orange);
    }
  }

  .menu-event-item {
    padding: 0.5em 0.2em 0.5em 0.2em;
    border-bottom: 1px solid #8080802e;
    position: relative;

    .bag-item-info {
      display: inline-grid;
      grid-template-columns: 6.5em 12em auto;
    }
  }

  .bag-total-price {
    font-weight: bold;
    margin-top: 1em;
    padding-top: 0.5em;
    display: inline-flex;
    width: 100%;

    .total-label {
      width: 50%;
    }

    .total-value {
      width: 50%;
      text-align: right;
    }
  }

  .empty-list {
    text-align: center;
  }
}
</style>
