<template>
  <div id="mini_bag_wrapper"
       v-bind:class="{'active': showMenu}"
       @mouseleave="closeMenuWithDelay()"
       @mouseenter="keepOpen()">
    <div class="mini-bag-header-wrapper" @click="toggleMenu()">
      <div v-if="cartTotalAmount" class="header-bag__price">
        {{userCurrency}} {{ cartTotalAmount.toFixed(2) }}
      </div>
      <div class="mini-bag-header-icon">
        <CustomIcon title="My Cart" type="bag" width="40px" height="40px"
                    :color="iconColor"></CustomIcon>
        <div v-if="numberOfItems" class="bag__item-counter">{{numberOfItems}}</div>
      </div>
    </div>
    <div class="menu-container" v-if="showMenu">
      <div class="close-menu-btn clickable" @click="closeMenu()">x</div>
      <template v-if="numberOfItems">
        <div class="list-container">
          <div v-for="i in items" v-bind:key="i.uuid" class="bag-item">
            <img :src="i.image+'?q=60&fit=crop&h=50&w=75'" :alt="i.uuid">
            <div>
              <div>{{ i.title }}</div>
              <div class="bag-item-details">
                <div class="ticket-number">{{ i.tickets }} x</div>
                <div>{{userCurrency}} {{ i.finalPrice.toFixed(2) }}</div>
                <div class="bag-sub-total">{{userCurrency}} {{(i.finalPrice *
                  i.tickets).toFixed(2)}}
                </div>
              </div>
            </div>
            <div class="item-remove-wrapper">
              <div class="item-remove-icon" @click="removeItem(i)">x</div>
            </div>
          </div>
        </div>
        <div class="bag-total-price">
          <div class="total-label">{{ $t('cart.total.label') }}</div>
          <div class="total-value">{{userCurrency}} {{ cartTotalAmount.toFixed(2) }}</div>
        </div>
        <div class="buy-all-wrapper">
          <div class="buy-all-btn clickable" @click="buyNow()">
            {{ $t('cart.buy.all') }}
          </div>
        </div>
      </template>
      <template v-else>
        <div>{{ $t('cart.emptylist.label') }}</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CustomIcon from '@/components/commons/CustomIcon.vue';
import {CURRENCIES, Currency} from '@/models/currenc.model';
import EventItem from '@/models/event.item';
import cartStore from '@/store/cart/cart-store';
import userStore from '@/store/user/user-store';
import appDataStore from '@/store/app-data/app-data-store';

  @Component({
    components: {CustomIcon},
  })
export default class MiniBag extends Vue {
    private userCartData = cartStore;

    private userData = userStore;

    private appDataStore = appDataStore;

    private timeout!: NodeJS.Timeout;

    get showMenu(): boolean {
      return this.appDataStore.currentActiveMenu === 'CART';
    }

    get numberOfItems(): number {
      return this.userCartData.numberOfTickets;
    }

    get items(): EventItem[] {
      return this.userCartData.getItems;
    }

    get cartTotalAmount(): number {
      const multiplier = 100;
      return Math.round(this.userCartData.totalAmount * multiplier) / multiplier;
    }

    get userCurrency(): string {
      const currency: Currency | undefined = CURRENCIES.find((c) => c.id === this.userData.currency);
      return currency ? currency.icon : this.userData.currency;
    }

    get iconColor(): string {
      return this.showMenu ? 'snow' : '#143c53';
    }

    toggleMenu(): void {
      if (this.showMenu) {
        this.closeMenu();
      } else {
        this.appDataStore.changeActiveMenu('CART');
      }
    }

    removeItem(item: EventItem): void {
      this.userCartData.removeSingle(item.uuid);
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

    buyNow(): void {
      window.alert('Not implemented yet :)');
    }
}
</script>

<style lang="scss" scoped>
  #mini_bag_wrapper {
    padding: 0.3em 2em 2em 1.2em;
    margin: 0;
    border-radius: 2em 0 0 0;
    border: 1px solid transparent;
    border-right: none;
    border-bottom: none;
    height: 4.5em;

    .clickable {
      cursor: pointer;
    }

    &.active {
      border: 1px solid var(--darkblue);
      border-right: none;
      border-bottom: none;
      color: var(--white);
      border-color: var(--white);
      background-color: var(--darkblue);
    }

    .mini-bag-header-wrapper {
      display: flex;
      align-items: flex-end;
      position: relative;

      .mini-bag-header-icon {
        position: relative;

        .icon {
          height: auto;
          fill: #444A59;
          width: 17px;
          margin-top: 4px;
        }

        .bag__item-counter {
          width: 15px;
          height: 15px;
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
          position: absolute;
          top: 0;
          right: -1em;
        }
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

    .bag-item {
      display: inline-grid;
      grid-template-columns: 6.5em 12em auto;
      padding: 0.5em 0.2em 0.5em 0.2em;
      border-bottom: 1px solid #8080802e;
      position: relative;

      .bag-item-details {
        margin-top: 0.5em;
        display: inline-grid;
        grid-template-columns: 3em 6em 5em;

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
        margin-right: 3em;
      }
    }

    .buy-all-wrapper {
      text-align: center;

      .buy-all-btn {
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
  }

</style>
