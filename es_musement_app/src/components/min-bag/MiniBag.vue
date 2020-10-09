<template>
  <div id="mini_bag_wrapper" @mouseleave="closeMenu()" @mouseenter="keepOpen()">
    <div class="header-bag__item header-bag__count" @click="toggleCart()">
      <div v-if="cartTotalAmount" class="header-bag__price">
        € {{ cartTotalAmount.toFixed(2) }}
      </div>
      <CustomIcon title="My Cart" type="bag"></CustomIcon>
      <span v-if="numberOfItems" class="bag__item-counter">{{numberOfItems}}</span>
    </div>
    <div class="bag-details-container" v-if="showDetails">
      <template v-if="numberOfItems">
        <div v-for="i in items" v-bind:key="i.uuid" class="bag-item">
          <img :src="i.image+'?q=60&fit=crop&h=50&w=75'" :alt="i.uuid">
          <div>
            <div>{{ i.title }}</div>
            <div class="bag-item-details">
              <div class="ticket-number">{{ i.tickets }} x</div>
              <div>€ {{ i.finalPrice.toFixed(2) }}</div>
              <div class="bag-sub-total">{{userCurrency}} {{(i.finalPrice *
                i.tickets).toFixed(2)}}
              </div>
            </div>
          </div>
          <div class="item-remove-wrapper">
            <div class="item-remove-icon" @click="removeItem(i)">x</div>
          </div>
        </div>
        <div class="bag-total-price">
          <div class="total-label">Total</div>
          <div class="total-value">{{userCurrency}} {{ cartTotalAmount.toFixed(2) }}</div>
        </div>
      </template>
      <template v-else>
        <div>Your bag is empty.</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CustomIcon from '@/components/commons/CustomIcon.vue';
import CartItemModel from '@/models/cart-item.model';
import cartStore from '@/store/cart/cart-store';
import userStore from '@/store/user/user-store';

  @Component({
    components: { CustomIcon },
  })
export default class MiniBag extends Vue {
    showDetails = false;

    userCartData = cartStore;

    userData = userStore;

    private timeout!: NodeJS.Timeout;

    get numberOfItems(): number {
      return this.userCartData.numberOfTickets;
    }

    get items(): CartItemModel[] {
      return this.userCartData.getItems;
    }

    get cartTotalAmount(): number {
      const multiplier = 100;
      return Math.round(this.userCartData.totalAmount * multiplier) / multiplier;
    }

    get userCurrency(): string {
      return this.userData.currency;
    }

    toggleCart(): void {
      this.showDetails = !this.showDetails;
    }

    removeItem(item: CartItemModel): void {
      this.userCartData.removeSingle(item.uuid);
    }

    closeMenu(): void {
      this.timeout = setTimeout(() => {
        this.showDetails = false;
      }, 400);
    }

    keepOpen(): void {
      if (this.timeout) {
        clearInterval(this.timeout);
      }
    }
}
</script>

<style lang="scss" scoped>
  #mini_bag_wrapper {
    .clickable {
      cursor: pointer;
    }

    .bag-item {
      display: inline-grid;
      grid-template-columns: 7em auto 1em;
      padding: 0.5em 0.2em 0.5em 0.2em;
      border-bottom: 1px solid #8080802e;

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

    .bag-details-container {
      position: absolute;
      top: 4em;
      right: 0;
      background-color: #ffffff;
      padding: 1em 1em 1em 1em;
      margin: 0;
      width: 40em;
      text-align: left;
      border: 1px solid lightgray;
      z-index: 3;

      .item-remove-wrapper {
        width: 100%;

        .item-remove-icon {
          color: red;
          cursor: pointer;
          right: 1em;
          position: absolute;
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
  }
</style>
