<template>
  <div id="mini_wishlist_wrapper"
       v-bind:class="{'active': showMenu}"
       @mouseleave="closeMenu()"
       @mouseenter="keepOpen()">
    <div class="wishlist-icon clickable"
         @click="toggleMenu()">
      <CustomIcon title="My Wishlist"
                  type="wishlist-img"
                  width="35px" height="35px"
                  :color="iconColor"></CustomIcon>
      <div v-if="numberOfItems" class="bag__item-counter">{{ numberOfItems }}</div>
    </div>
    <div class="menu-container" v-if="showMenu">
      <template v-if="numberOfItems">
        <div v-for="i in wishListItems" v-bind:key="i.uuid" class="bag-item">
          <img :src="i.cover_image_url+'?q=60&fit=crop&h=50&w=75'" :alt="i.uuid">
          <div>
            <div>{{ i.title }}</div>
          </div>
          <div class="item-remove-wrapper">
            <div class="item-remove-icon" @click="removeItem(i.uuid)">x</div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="empty-list"> {{ $t('wishlist.emptylist.label') }}</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CustomIcon from '@/components/commons/CustomIcon.vue';
import wishlistStore from '@/store/wishlist/wishlist-store';
import { MusementItem } from '@/models/musement.models';

  @Component({
    components: { CustomIcon },
  })
export default class MiniWishlist extends Vue {
    showMenu = false;

    private timeout!: NodeJS.Timeout;

    private wishlistStore = wishlistStore;

    get numberOfItems(): number {
      return this.wishlistStore.numberOfItems;
    }

    get wishListItems(): MusementItem[] {
      return this.wishlistStore.getItems;
    }

    get iconColor(): string {
      return this.numberOfItems ? 'orange' : 'gray';
    }

    clearWishList(): void {
      this.wishlistStore.clear();
    }

    toggleMenu(): void {
      this.showMenu = !this.showMenu;
    }

    closeMenu(): void {
      this.timeout = setTimeout(() => {
        this.showMenu = false;
      }, 400);
    }

    keepOpen(): void {
      if (this.timeout) {
        clearInterval(this.timeout);
      }
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

    &.active {
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
        /*height: auto;*/
        fill: #444A59;
      }

      .bag__item-counter {
        position: absolute;
        left: 3em;
        top: 0em;
        width: 15px;
        height: 15px;
        margin-left: -1px;

        display: flex;
        align-self: flex-start;
        justify-content: center;
        align-items: center;

        font-family: 'Lato-Bold', sans-serif;
        font-size: 8px;
        text-align: center;

        border-radius: 50%;
        color: var(--darkblue);
        background-color: var(--orange);
      }
    }

    .clickable {
      cursor: pointer;

      &:hover {
        color: orange;
      }
    }

    .menu-container {
      position: fixed;
      top: 4.5em;
      right: 0;
      background-color: var(--darkblue);
      color: var(--white);
      min-height: 100%;
      padding: 1em 1em 1em 1em;
      margin: 0;
      width: 25em;
      text-align: left;
      z-index: 3;
    }

    .bag-item {
      display: inline-grid;
      grid-template-columns: 7em auto 1em;
      padding: 0.5em 0.2em 0.5em 0.2em;
      border-bottom: 1px solid #8080802e;
      position: relative;

      .bag-item-details {
        display: inline-grid;
        grid-template-columns: 3em 22em 5em;

        .ticket-number {
          color: blue;
        }

        .bag-sub-total {
          text-align: right;
          font-style: italic;
        }
      }
    }

    .item-remove-wrapper {
      width: 100%;

      .item-remove-icon {
        color: var(--red);
        cursor: pointer;
        right: 1em;
        position: absolute;

        &:hover {
          color: var(--orange);
        }
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
