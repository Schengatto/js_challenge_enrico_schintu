<template>
  <div class="header-margin">
    <header class="header container">
      <div class="page-title">
        Es Musement
      </div>
      <aside class="header-bag">
        <MiniBag></MiniBag>
        <div class="header-bag__item header-bag__wishlist-count"
             @click="toggleWishList()">
          <CustomIcon title="My Wishlist" type="wishlist"></CustomIcon>
          <span v-if="wishlistItems" class="bag__item-counter"
          >{{ wishlistItems }}
          </span>
        </div>
        <UserMenu></UserMenu>
      </aside>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CustomIcon from '@/components/commons/CustomIcon.vue';
import MiniBag from '@/components/min-bag/MiniBag.vue';
import UserMenu from '@/components/user-menu/UserMenu.vue';
import wishlistStore from '@/store/wishlist/wishlist-store';

  @Component({
    components: { UserMenu, MiniBag, CustomIcon },
  })
export default class AppHeader extends Vue {
    private wishlistStore = wishlistStore;

    get wishlistItems(): number {
      return this.wishlistStore.numberOfItems;
    }

    toggleWishList(): void {
      this.wishlistStore.clear();
    }
}
</script>

<style lang="scss" scoped>

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 0;
    margin: 0;
    min-width: 100%;
    height: 4.5em;
    background-color: var(--gray);
    box-shadow: 0 3px lightgrey;

    .page-title {
      margin-left: 2em;
      font-size: 20px;
    }

  }

  .header-margin {
    margin: 7em 0 0 0;
  }
</style>
