<template>
  <div id="user_menu_wrapper"
       class="unselectable"
       v-bind:class="{'active': showMenu}"
       @mouseenter="keepOpen()">
    <div class="clickable" @click="toggleMenu()">
      <CustomIcon title="User menu" type="user" width="40px" height="40px"
                  :color="iconColor"></CustomIcon>
    </div>
    <div class="menu-container" v-if="showMenu">
      <div class="close-menu-btn clickable" @click="closeMenu()">x</div>
      <div class="menu-header">
        <div>{{ $t('user.menu.header.hello') }} {{userData.username}}</div>
        <div class="user-email-wrapper"><small>{{userData.email}}</small></div>
      </div>
      <div class="menu-section">
        <div class="menu-section-title"> {{ $t('user.menu.languages') }}</div>
        <div class="menu-option-list">
          <div v-for="lang in availableLanguages"
               v-bind:key="lang.id"
               class="submenu-item clickable menu-option-item"
               @click="setLanguage(lang.id)">
            <CustomIcon :type="lang.icon"
                        :title="lang.id">
            </CustomIcon>
            <span>{{lang.name}}</span>
          </div>
        </div>
      </div>
      <div class="menu-section">
        <div class="menu-section-title"> {{ $t('user.menu.currencies') }}</div>
        <div class="menu-option-list">
          <div v-for="(curr, i) in availableCurrencies"
               v-bind:key="i"
               class="submenu-item clickable menu-option-item"
               @click="setCurrency(curr.id)">
            <div>{{curr.icon}}</div>
            <span>{{curr.name}}</span>
          </div>
        </div>
      </div>
      <div class="menu-section">
        <div class="menu-section-title">{{ $t('user.menu.dashboard.views.title') }}</div>
        <div class="menu-option-list">
          <div class="clickable menu-option-item"
               @click="changeDashboardView('paginated')">{{
            $t('user.menu.dashboard.views.paginated') }}
          </div>
          <div class="clickable menu-option-item"
               @click="changeDashboardView('scroll')">
            {{ $t('user.menu.dashboard.views.scroll') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CustomIcon from '@/components/commons/CustomIcon.vue';
import UserDataModel from '@/models/user-data.model';
import {Locale, LOCALES} from '@/models/locale.model';
import {CURRENCIES, Currency} from '@/models/currenc.model';
import userStore from '@/store/user/user-store';
import dashboardStore from '@/store/dashboard/dashboard-store';
import appDataStore from '@/store/app-data/app-data-store';

  @Component({
    components: {CustomIcon},
  })
export default class UserMenu extends Vue {
    private userStore = userStore;

    private dashboardStore = dashboardStore;

    private appDataStore = appDataStore;

    private timeout!: NodeJS.Timeout;

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

    get iconColor(): string {
      return this.showMenu ? 'snow' : '#143c53';
    }

    get showMenu(): boolean {
      return this.appDataStore.currentActiveMenu === 'USER';
    }

    toggleMenu(): void {
      if (this.showMenu) {
        this.closeMenu();
      } else {
        this.appDataStore.changeActiveMenu('USER');
      }
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

    setLanguage(language: string): void {
      this.userStore.changeLanguage(language);
    }

    setCurrency(currency: string): void {
      this.userStore.changeCurrency(currency);
    }

    changeDashboardView(dashboardView: string): void {
      this.dashboardStore.updateDashboardView(dashboardView);
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
