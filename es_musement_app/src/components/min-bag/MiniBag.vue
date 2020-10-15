<template>
  <div id="mini_bag_wrapper" v-bind:class="{ active: showMenu }">
    <div class="mini-bag-header-wrapper unselectable clickable" @click="toggleMenu()">
      <div v-if="cartTotalAmount" class="header-bag__price">
        {{ userCurrency }} {{ cartTotalAmount.toFixed(2) }}
      </div>
      <div class="mini-bag-header-icon">
        <CustomIcon
          title="My Cart"
          type="bag"
          width="40px"
          height="40px"
          :color="iconColor"
        ></CustomIcon>
        <div v-if="numberOfItems" class="item__counter">{{ numberOfItems }}</div>
      </div>
    </div>
    <div class="menu-container" v-if="showMenu" @wheel="preventMouseWheelPropagation($event)">
      <div class="close-menu-btn clickable" @click="closeMenu()">x</div>
      <div v-if="numberOfItems">
        <div class="list-container">
          <div v-for="i in items" v-bind:key="i.uuid" class="menu-event-item">
            <div class="bag-item-info">
              <ImageWrapper
                width="75"
                height="50"
                :src="i.image"
                :title="i.title"
                src-height="40"
                src-width="65"
                quality="50"
              ></ImageWrapper>
              <div>
                <div>{{ i.title }}</div>
              </div>
              <div class="item-remove-wrapper">
                <div class="item-remove-icon" @click.prevent="removeItem(i.uuid)">x</div>
              </div>
            </div>
            <div class="bag-item-details">
              <div class="ticket-wrapper unselectable">
                <div class="ticket-btn remove-ticket-btn" @click="removeTicket(i)">-</div>
                <div class="ticket-number">{{ i.tickets }}<small> x</small></div>
                <div class="ticket-btn add-ticket-btn" @click="addTicket(i)">+</div>
              </div>
              <div>{{ userCurrency }} {{ i.finalPrice.toFixed(2) }}</div>
              <div class="bag-sub-total">
                {{ userCurrency }} {{ (i.finalPrice * i.tickets).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
        <div class="bag-total-price">
          <div class="total-label">{{ $t("cart.total.label") }}</div>
          <div class="total-value">{{ userCurrency }} {{ cartTotalAmount.toFixed(2) }}</div>
        </div>
        <div class="menu-footer">
          <div v-if="showWarning" class="warning-message">{{ $t("common.not.implemented") }}</div>
          <div class="menu-footer-btn clickable" @click="buyNow()">
            {{ $t("cart.buy.all") }}
          </div>
        </div>
      </div>
      <div v-else>
        <div>{{ $t("cart.emptylist.label") }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomIcon from "@/components/commons/CustomIcon.vue";
import EventItem from "@/models/event.item";
import { getModule } from "vuex-module-decorators";
import UserDataStore from "@/store/user/user-data-store";
import AppDataStore from "@/store/app-data/app-data-store";
import CartStore from "@/store/cart/cart-store";
import ImageWrapper from "@/components/commons/ImageWrapper.vue";

@Component({
  components: { ImageWrapper, CustomIcon }
})
export default class MiniBag extends Vue {
  private cartStore = getModule(CartStore);

  private userData = getModule(UserDataStore);

  private appDataStore = getModule(AppDataStore);

  private showWarning = false;

  private timeout!: NodeJS.Timeout;

  /** True if the user menu is visible */
  get showMenu(): boolean {
    return this.appDataStore.currentActiveMenu === "CART";
  }

  /** Number of tickets in the user cart */
  get numberOfItems(): number {
    return this.cartStore.numberOfTickets;
  }

  /** Events that should be displayed in the menu */
  get items(): EventItem[] {
    return this.cartStore.getItems;
  }

  /** Total price amount of the tickets in the user cart */
  get cartTotalAmount(): number {
    const multiplier = 100;
    return Math.round(this.cartStore.totalAmount * multiplier) / multiplier;
  }

  /** The active currency */
  get userCurrency(): string {
    return this.userData.currency;
  }

  /** Defines the color of the cart icon in the header */
  get iconColor(): string {
    return this.showMenu ? "snow" : "#143c53";
  }

  /** Show/Hide the User menu */
  toggleMenu(): void {
    if (this.showMenu) {
      this.closeMenu();
    } else {
      this.appDataStore.changeActiveMenu("CART");
    }
  }

  /** Remove one item from the cart */
  removeItem(item: string): void {
    this.cartStore.removeSingle(item);
  }

  /** Close the Cart menu */
  closeMenu(): void {
    this.appDataStore.changeActiveMenu("NONE");
  }

  /** Remove one ticket of a item in the cart */
  removeTicket(item: EventItem): void {
    if (item.tickets > 1) {
      this.cartStore.removeTicket(item.uuid);
    }
  }

  /** Add one ticket of a item in the cart */
  addTicket(item: EventItem): void {
    this.cartStore.addSingle(item);
  }

  /** This feature is not implemented yet it is there just for demonstrative purposes */
  buyNow(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.showWarning = true;
    this.timeout = setTimeout(() => {
      this.showWarning = false;
    }, 2000);
  }

  /** Avoid to propagate the mouse wheel on the background elements */
  preventMouseWheelPropagation(event: MouseEvent) {
    event.stopPropagation();
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

  @media screen and (max-height: 700px) {
    .menu-container {
      :root {
        overflow: hidden;
      }

      width: 100%;

      .list-container {
        max-height: 160px;
      }
    }
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
        fill: #444a59;
        width: 17px;
        margin-top: 4px;
      }

      .item__counter {
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
        bottom: 4em;
        right: -1em;
      }
    }
  }

  .menu-event-item {
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
      grid-template-columns: 7em 7em 7em;

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
          position: absolute;
          bottom: 0;
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
