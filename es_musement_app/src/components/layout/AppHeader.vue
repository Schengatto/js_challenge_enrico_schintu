<template>
    <div class="header-margin">
        <header class="header container">
            <div class="page-title">
                <UserMenu></UserMenu>
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
            </aside>
        </header>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import wishlistStore from "@/store/wishlist/wishlist-store.ts";
    import CustomIcon from "@/components/commons/CustomIcon.vue";
    import MiniBag from "@/components/min-bag/MiniBag.vue";
    import UserMenu from "@/components/user-menu/UserMenu.vue";

    @Component({
        components: {UserMenu, MiniBag, CustomIcon}
    })
    export default class AppHeader extends Vue {
        get wishlistItems(): number {
            return wishlistStore.numberOfItems;
        }

        toggleWishList(): void {
            wishlistStore.clear();
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
    }

    .header-margin {
        margin: 7em 0 0 0;
    }
</style>
