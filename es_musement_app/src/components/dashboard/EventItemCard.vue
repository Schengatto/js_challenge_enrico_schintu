<template>
  <article class="product" itemscope>
    <div class="product-header unselectable">
      <figure class="product__image-wrapper">
        <img class="product__image product-image"
             :src="imageSrc"
             alt="Product"
             itemprop="image"
             height="150px"/>
        <button class="product__wishlist-button button button--round button--wishlist"
                @click="addToWishlist()">
          <CustomIcon type="wishlist"
                      width="20px" height="20px"
                      :title="$t('common.btn.add_to_wishlist')"
                      :color="presentInList ? 'orange' : 'gray'">
          </CustomIcon>
        </button>
      </figure>
    </div>
    <div class="product__details">
      <h1 class="product__title" itemprop="brand">{{ item.title }}</h1>
      <p class="product__subtitle" itemprop="description">
        {{ item.description }}
      </p>
      <button class="product__add-to-cart button button--primary cart-btn" @click="addToCart()"
              @mouseenter="showCartLabel()" @mouseleave="hideCartLabel()">
        <template class="product__price" itemscope>
          <div v-if="displayAddToCart" class="add-to-cart-label">
            {{ $t('common.btn.add_to_cart') }}
          </div>
          <div>
            <span v-if="item.discounted" class="product__price--strike">
          {{item.originalPrice}}</span>
            <span class="product__price--discounted" itemprop="price">
              {{item.finalPriceFormatted}}</span>
          </div>
        </template>
      </button>
    </div>
  </article>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import CustomIcon from '@/components/commons/CustomIcon.vue';
import wishlistStore from '@/store/wishlist/wishlist-store';
import cartStore from '@/store/cart/cart-store';
import EventItem from '@/models/event.item';

  @Component({
    components: {CustomIcon},
  })
export default class EventItemCard extends Vue {
    @Prop() item!: EventItem;

    displayAddToCart = false;

    get presentInList(): boolean {
      return wishlistStore.getItemsIds.includes(this.item.uuid);
    }

    get imageSrc(): string {
      return `${this.item.image}?q=70&fit=crop&h=150&w=300`;
    }

    addToWishlist(): void {
      wishlistStore.toggleItem(this.item);
    }

    addToCart(): void {
      cartStore.addSingle(this.item);
    }

    showCartLabel(): void {
      this.displayAddToCart = true;
    }

    hideCartLabel(): void {
      this.displayAddToCart = false;
    }
}
</script>

<style scoped lang="scss">

  .product {
    text-align: center;
    box-shadow: 3px 2px #9fa3a321;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #ffffff;

    .product__image {
      max-width: 100%;
      height: auto;
    }

    .product__image-wrapper {
      position: relative;
      text-align: center;
      background-color: var(--green);
    }

    .product__image {
      max-width: 100%;
      height: auto;
    }

    .product__wishlist-button {
      width: 35px;
      height: 35px;

      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;
      top: 10px;
      right: 10px;
    }

    .product-image {
      height: 250px;
      background-color: var(--darkblue);
    }

    .product__details {
      display: flex;
      flex: 1 0 auto;
      flex-direction: column;
      padding: 10px 20px 20px;
      text-align: center;
      height: 18em;

      .product__add-to-cart {
        width: 100%;
        margin-top: auto;
      }

      .cart-btn {
        color: black;
        padding: 0.8em;
        border: solid 1px mediumaquamarine;
        border-radius: 0;
        font-size: 11px;

        /*Magic*/
        background-image: linear-gradient(to left, snow 50%, mediumaquamarine 50%);
        background-size: 200% 100%;
        background-position: right bottom;
        transition: all ease .3s;

        &:hover {
          display: inline-grid;
          grid-template-columns: 70% 30%;
          background-position: left bottom;
        }

        .add-to-cart-label {
          color: snow;
        }
      }
    }

  }
</style>
