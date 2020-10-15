<template>
  <div id="user_menu_wrapper" class="unselectable" v-bind:class="{ active: showMenu }">
    <div id="user_menu_header_btn" class="clickable" @click="toggleMenu()">
      <CustomIcon
        title="User menu"
        type="user"
        width="40px"
        height="40px"
        :color="iconColor"
      ></CustomIcon>
    </div>
    <div class="menu-container" v-if="showMenu" @wheel="preventMouseWheelPropagation($event)">
      <div class="close-menu-btn clickable" @click="closeMenu()">x</div>
      <div class="menu-header">
        <div>{{ $t("user.menu.header.hello") }} {{ userData.username }}</div>
        <div class="user-email-wrapper">
          <small>{{ userData.email }}</small>
        </div>
      </div>
      <div class="menu-section">
        <div class="menu-section-title">{{ $t("user.menu.languages") }}</div>
        <div class="menu-option-list">
          <div
            v-for="lang in availableLanguages"
            v-bind:key="lang.id"
            class="submenu-item clickable menu-option-item language-btn"
            @click="setLanguage(lang.id)"
          >
            <CustomIcon :type="lang.icon" :title="lang.id"></CustomIcon>
            <span>{{ lang.name }}</span>
          </div>
        </div>
      </div>
      <div class="menu-section">
        <div class="menu-section-title">{{ $t("user.menu.currencies") }}</div>
        <div class="menu-option-list">
          <div
            v-for="(curr, i) in availableCurrencies"
            v-bind:key="i"
            class="submenu-item clickable menu-option-item currency-btn"
            @click="setCurrency(curr.id)"
          >
            <div>{{ curr.icon }}</div>
            <span>{{ curr.name }}</span>
          </div>
        </div>
      </div>
      <div class="menu-section">
        <div class="menu-section-title">{{ $t("user.menu.dashboard.views.title") }}</div>
        <div class="menu-option-list">
          <div
            id="paginated_view_btn"
            class="clickable menu-option-item"
            @click="changeShowcaseView('paginated')"
          >
            {{ $t("user.menu.dashboard.views.paginated") }}
          </div>
          <div
            id="scrollable_view_btn"
            class="clickable menu-option-item"
            @click="changeShowcaseView('scroll')"
          >
            {{ $t("user.menu.dashboard.views.scroll") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomIcon from "@/components/commons/CustomIcon.vue";
import UserDataModel from "@/models/user-data.model";
import { Locale, LOCALES } from "@/models/locale.model";
import { CURRENCIES, Currency } from "@/models/currency.model";
import UserDataStore from "@/store/user/user-data-store";
import ShowcaseStore from "@/store/showcase/showcase-store";
import AppDataStore from "@/store/app-data/app-data-store";
import { getModule } from "vuex-module-decorators";
import { UserStoreInterface } from "@/store/user/user-store.model";
import { ShowcaseStoreInterface } from "@/store/showcase/showcase-store.model";
import { AppDataStoreInterface } from "@/store/app-data/app-data-store-model";

@Component({
  components: { CustomIcon }
})
export default class UserMenu extends Vue {
  userStore: UserStoreInterface = getModule(UserDataStore);
  showcaseStore: ShowcaseStoreInterface = getModule(ShowcaseStore);
  appDataStore: AppDataStoreInterface = getModule(AppDataStore);

  private locales: Locale[] = LOCALES;

  private currencies: Currency[] = CURRENCIES;

  get userData(): UserDataModel | null {
    return this.userStore.userData;
  }

  get availableLanguages(): Locale[] {
    return this.locales;
  }

  get availableCurrencies(): Currency[] {
    return this.currencies;
  }

  /** Defines the color of the user icon in the header */
  get iconColor(): string {
    return this.showMenu ? "snow" : "#143c53";
  }

  /** True if the user menu is visible */
  get showMenu(): boolean {
    return this.appDataStore.currentActiveMenu === "USER";
  }

  /** Show/Hide the User menu */
  toggleMenu(): void {
    if (this.showMenu) {
      this.closeMenu();
    } else {
      this.appDataStore.changeActiveMenu("USER");
    }
  }

  /** Close the User menu */
  closeMenu(): void {
    this.appDataStore.changeActiveMenu("NONE");
  }

  /** Set the language of application */
  setLanguage(language: string): void {
    this.userStore.changeLanguage(language);
  }

  /** Set the currency of application */
  setCurrency(currency: string): void {
    this.userStore.changeCurrency(currency);
  }

  /** Set the view of the showcase */
  changeShowcaseView(showcaseView: string): void {
    this.showcaseStore.updateShowcaseView(showcaseView);
  }

  /** Avoid to propagate the mouse wheel on the background elements */
  preventMouseWheelPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}
</script>

<style lang="scss" scoped>
#user_menu_wrapper {
  padding: 0.3em 2.5em 2em 1.2em;
  margin: 0;
  border-radius: 2em 0 0 0;
  border: 1px solid transparent;
  border-right: none;
  border-bottom: none;
  height: 4.5em;

  @media screen and (max-height: 700px) {
    .menu-container {
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
    border-color: var(--white);
    background-color: var(--darkblue);
  }

  .user-email-wrapper {
    margin: 0.5em;
    font-style: italic;
  }

  .submenu-item {
    display: inline-grid;
    grid-template-columns: 2em auto;
    padding: 0.4em;
  }

  .menu-option-list {
    margin: 1em 0 1em 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    grid-auto-flow: row;

    .menu-option-item {
      padding: 1em;
      font-size: 12px;
      border: 1px solid var(--orange);
      width: 40%;

      &:hover {
        background-color: var(--orange);
        color: var(--white);
      }
    }
  }

  .item-remove-icon {
    color: var(--red);
    cursor: pointer;
  }
}

.bag-total-price {
  border-top: 2px solid lightgray;
  font-weight: bold;
  margin-top: 1em;
  padding-top: 0.5em;
}
</style>
