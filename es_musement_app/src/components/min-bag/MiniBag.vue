<template>
  <div id="mini_bag_wrapper"
       v-bind:class="{'active': showMenu}"
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
            <div class="bag-item-info">
              <img :src="i.image+'?q=60&fit=crop&h=50&w=75'" :alt="i.uuid">
              <div>
                <div>{{ i.title }}</div>
              </div>
              <div class="item-remove-wrapper">
                <div class="item-remove-icon" @click="removeItem(i)">x</div>
              </div>
            </div>
            <div class="bag-item-details">
              <div class="ticket-wrapper unselectable">
                <div class="ticket-btn remove-ticket-btn" @click="removeTicket(i)">-</div>
                <div class="ticket-number">{{ i.tickets }}<small> x</small></div>
                <div class="ticket-btn add-ticket-btn" @click="addTicket(i)">+</div>
              </div>
              <div>{{userCurrency}} {{ i.finalPrice.toFixed(2) }}</div>
              <div class="bag-sub-total">{{userCurrency}} {{(i.finalPrice *
                i.tickets).toFixed(2)}}
              </div>
            </div>
          </div>
        </div>
        <div class="bag-total-price">
          <div class="total-label">{{ $t('cart.total.label') }}</div>
          <div class="total-value">{{userCurrency}} {{ cartTotalAmount.toFixed(2) }}</div>
        </div>
        <div class="menu-footer">
          <div class="menu-footer-btn clickable" @click="buyNow()">
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

    removeTicket(item: EventItem): void {
      if (item.tickets > 1) {
        this.userCartData.removeTicket(item.uuid);
      }
    }

    addTicket(item: EventItem): void {
      this.userCartData.addSingle(item);
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

    .bag-item {
      padding: 0.5em 0.2em 0.5em 0.2em;
      border-bottom: 1px solid #8080802e;
      position: relative;

      .bag-item-info {
        display: inline-grid;
        grid-template-columns: 6.5em 12em auto;
      }

      .bag-item-details {
        margin-top: 0.8em;
        display: inline-grid;
        grid-template-columns: 7em 8.5em 5.5em;

        .ticket-wrapper {
          display: flex;
          justify-content: space-evenly;
          position: relative;
          width: 6em;

          .ticket-btn {
            padding: 0.2em;
            border: 1px solid white;
            width: 1.5em;
            text-align: center;
          }

          .remove-ticket-btn {
            position: absolute;
            left: 0;
            bottom: 0;

            &:hover {
              background-color: var(--red);
            }
          }

          .ticket-number {
            color: var(--orange);
          }

          .add-ticket-btn {
            position: absolute;
            right: 0.1em;
            bottom: 0;

            &:hover {
              background-color: var(--green);
            }
          }
        }

        .bag-sub-total {
          text-align: right;
          font-style: italic;
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
        margin-right: 1.5em;
      }
    }
  }

</style>
