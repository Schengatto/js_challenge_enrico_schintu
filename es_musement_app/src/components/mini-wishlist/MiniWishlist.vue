<template>
  <div id="mini_wishlist_wrapper"
       v-bind:class="{'active': showMenu}"
       @mouseleave="closeMenuWithDelay()"
       @mouseenter="keepOpen()">
    <div class="wishlist-icon clickable"
         @click="toggleMenu()">
      <CustomIcon title="My Wishlist"
                  type="wishlist"
                  width="35px" height="35px"
                  :color="iconColor"></CustomIcon>
      <div v-if="numberOfItems" class="bag__item-counter">{{ numberOfItems }}</div>
    </div>
    <div class="menu-container" v-if="showMenu">
      <template v-if="numberOfItems">
        <div class="close-menu-btn clickable" @click="closeMenu()">x</div>
        <div class="list-container">
          <div v-for="i in wishListItems" v-bind:key="i.uuid" class="bag-item">
            <img :src="i.image+'?q=60&fit=crop&h=50&w=75'" :alt="i.uuid">
            <div>
              <div>{{ i.title }}</div>
            </div>
            <div class="item-remove-wrapper">
              <div class="item-remove-icon" @click="removeItem(i.uuid)">x</div>
            </div>
          </div>
        </div>

        <div class="remove-all-wrapper">
          <div class="remove-all-btn clickable" @click="clearWishList">
            {{ $t('wishlist.remove.all') }}
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
import {Component, Vue} from 'vue-property-decorator';
import CustomIcon from '@/components/commons/CustomIcon.vue';
import EventItem from '@/models/event.item';
import wishlistStore from '@/store/wishlist/wishlist-store';
import appDataStore from '@/store/app-data/app-data-store';

  @Component({
    components: {CustomIcon},
  })
export default class MiniWishlist extends Vue {
    private wishlistStore = wishlistStore;

    private appDataStore = appDataStore;

    private timeout!: NodeJS.Timeout;

    get showMenu(): boolean {
      return this.appDataStore.currentActiveMenu === 'WISHLIST';
    }

    get numberOfItems(): number {
      return this.wishlistStore.numberOfItems;
    }

    get wishListItems(): EventItem[] {
      return this.wishlistStore.getItems;
    }

    get iconColor(): string {
      return this.showMenu ? 'snow' : '#143c53';
    }

    clearWishList(): void {
      this.wishlistStore.clear();
    }

    toggleMenu(): void {
      if (this.showMenu) {
        this.closeMenu();
      } else {
        this.appDataStore.changeActiveMenu('WISHLIST');
      }
    }

    closeMenuWithDelay(): void {
      this.timeout = setTimeout(() => {
        if (this.showMenu) {
          this.closeMenu();
        }
      }, 400);
    }

    closeMenu(): void {
      this.appDataStore.changeActiveMenu('NONE');
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
        fill: #444A59;
      }

      .bag__item-counter {
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

    .close-menu-btn {
      width: 25px;
      height: 25px;
      display: flex;
      align-self: flex-start;
      justify-content: center;
      align-items: center;
      font-family: "Lato-Bold", sans-serif;
      font-size: 12px;
      text-align: center;
      border-radius: 50%;
      color: var(--white);
      border: 3px solid var(--white);
      margin-bottom: 1em;

      &:hover {
        color: var(--darkblue);
        background-color: var(--white);
      }
    }

    .menu-container {
      position: fixed;
      top: 4.5em;
      right: 0;
      background-color: var(--darkblue);
      color: var(--white);
      min-height: 100%;
      padding: 1em 0.2em 1em 1em;
      margin: 0;
      width: 25em;
      text-align: left;
      z-index: 3;

      .list-container {
        max-height: 65vh;
        overflow: auto;
      }
    }

    .bag-item {
      display: inline-grid;
      grid-template-columns: 6.5em 12em auto;
      padding: 0.5em 0.2em 0.5em 0.2em;
      border-bottom: 1px solid #8080802e;
      position: relative;
    }

    .item-remove-wrapper {
      width: 100%;
      position: absolute;
      left: 3em;
      top: 0.5em;

      .item-remove-icon {
        color: var(--red);
        cursor: pointer;
        right: 1em;
        border: solid 2px var(--red);;
        font-size: 10px;
        width: 20px;
        text-align: center;
        padding: 0.5em;
        display: flex;
        height: 20px;
        align-self: flex-start;
        justify-content: center;
        align-items: center;
        font-family: "Lato-Bold", sans-serif;
        border-radius: 50%;
        position: absolute;
        top: 0;

        &:hover {
          color: var(--snow);
          background-color: var(--red);
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

    .remove-all-wrapper {
      text-align: center;

      .remove-all-btn {
        margin: 1em 0.5em 0 0;
        padding: 1em;
        font-size: 12px;
        border: 1px solid var(--orange);

        &:hover {
          background-color: var(--orange);
          color: var(--white);
        }
      }
    }

    .empty-list {
      text-align: center;
    }

  }

</style>
