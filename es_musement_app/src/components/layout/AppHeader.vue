<template>
  <div class="header-margin">
    <header class="header container">
      <div class="page-title">
        Js Challenge
      </div>
      <aside class="header-bag">
        <MiniBag></MiniBag>
        <MiniWishlist></MiniWishlist>
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
import MiniWishlist from '@/components/mini-wishlist/MiniWishlist.vue';

  @Component({
    components: {
      MiniWishlist, UserMenu, MiniBag, CustomIcon,
    },
  })
export default class AppHeader extends Vue {
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
    /*box-shadow: 0 3px lightgrey;*/

    .page-title {
      margin-left: 2%;
      font-size: 14px;
      text-shadow: 1px 1px gray;
      font-variant: all-petite-caps;
    }
  }

  .header-margin {
    margin: 7em 0 0 0;
  }
</style>
