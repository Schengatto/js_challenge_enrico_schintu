<template>
  <div id="mini_bag_wrapper"
       v-bind:class="{'active': showMenu}"
       @mouseleave="closeMenu()"
       @mouseenter="keepOpen()">
    <div class="header-bag__item header-bag__count" @click="toggleCart()">
      <div v-if="cartTotalAmount" class="header-bag__price">
        € {{ cartTotalAmount.toFixed(2) }}
      </div>
      <CustomIcon title="My Cart" type="bag"></CustomIcon>
      <span v-if="numberOfItems" class="bag__item-counter">{{numberOfItems}}</span>
    </div>
    <div class="menu-container" v-if="showMenu">
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
        <div>{{ $t('cart.emptylist.label') }}</div>
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
    showMenu = false;

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
      this.showMenu = !this.showMenu;
    }

    removeItem(item: CartItemModel): void {
      this.userCartData.removeSingle(item.uuid);
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
}
</script>

<style lang="scss" scoped>
  #mini_bag_wrapper {
    padding: 0.3em 1em 2em 1.2em;
    margin: 0;
    border-radius: 2em 0 0 0;
    border: 1px solid transparent;
    border-right: none;
    border-bottom: none;
    height: 3em;

    .clickable {
      cursor: pointer;
    }

    &.active {
      border-color: var(--white);
      background-color: var(--darkblue);
      color: var(--orange);
    }

    .bag-item {
      display: inline-grid;
      grid-template-columns: 7em auto 1em;
      padding: 0.5em 0.2em 0.5em 0.2em;
      border-bottom: 1px solid #8080802e;
      position: relative;

      .bag-item-details {
        display: inline-grid;
        grid-template-columns: 3em 7em 5em;

        .ticket-number {
          color: var(--orange);
        }

        .bag-sub-total {
          text-align: right;
          font-style: italic;
        }
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
  }

  .bag__item-counter {
    width: 13px;
    height: 13px;
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

</style>
