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
      border-radius: 50%;
    }

    .product-image {
      height: 250px;
      background-color: var(--darkblue);
    }

    .product__subtitle {
      font-size: 1.1em;
      margin: 0.5em 0 0 0;
      max-height: 5.5em;
      overflow: auto;
    }

    .product__details {
      display: flex;
      flex: 1 0 auto;
      flex-direction: column;
      padding: 10px 20px 20px;
      text-align: center;
      height: 19em;
    }

    .product__add-to-cart {
      width: 100%;
      margin-top: auto;
    }

    .cart-btn {
      color: black;
      padding: 0.8em;
      border: 1px solid mediumaquamarine;
      border-radius: 100px;
      font-size: 11px;
      background-image: linear-gradient(to left, snow 50%, mediumaquamarine 50%);
      background-size: 200% 100%;
      background-position: right bottom;
      transition: all ease .3s;
      background-color: #ffffff;
      cursor: pointer;

      &:hover {
        display: inline-grid;
        grid-template-columns: 70% 30%;
        background-position: left bottom;
      }

      .add-to-cart-label {
        color: snow;
      }
    }

    .product__price {
      padding-bottom: 20px;

      font-family: 'Lato-Bold', sans-serif;
      font-size: 14px;
      letter-spacing: 2.33px;
    }

    .product__price--strike {
      margin-right: 10px;
      text-decoration: line-through;
    }

    .button--round {
      display: block;
      border-radius: 50%;
    }

    .button--primary {
      padding: 13px;
      font-family: 'Lato-Bold', sans-serif;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1.39px;

      &:hover {
        border: 1px solid #444A59;
        color: #ffffff;
        background-color: #444A59;
      }
    }

    .button--wishlist:hover {
      border: 1px solid #444A59;
    }

    .already-in-wishlist > .icon {
      fill: orange;
    }

    .button--wishlist:hover > .icon {
      fill: #444A59;
    }

  }
</style>
