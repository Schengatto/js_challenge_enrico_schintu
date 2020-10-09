<template>
  <div id="user_menu_wrapper"
       @mouseleave="closeMenu()"
       @mouseenter="keepOpen()">
    <div class="clickable" @click="toggleMenu()">
      <CustomIcon title="User menu" type="user"></CustomIcon>
    </div>
    <div class="bag-details-container" v-if="showMenu">
      <div>Ciao {{userData.username}}</div>
      <div>{{userData.email}}</div>
      <hr>
      <div>
        <div>Lingua</div>
        <div v-for="lang in languages"
             v-bind:key="lang.id"
             class="submenu-item clickable"
             @click="setLanguage(lang.id)">
          <CustomIcon :type="lang.icon"
                      :title="lang.id">
          </CustomIcon>
          <span>{{lang.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CustomIcon from '@/components/commons/CustomIcon.vue';
import userStore from '@/store/user/user-store';
import UserDataModel from '@/models/user-data.model';
import { Locale, LOCALES } from '@/models/locale.model';
import { CURRENCIES, Currency } from '@/models/currenc.model';
import VueI18n, { LocaleMessages } from 'vue-i18n';

  @Component({
    components: { CustomIcon },
  })
export default class UserMenu extends Vue {
    showMenu = false;

    private timeout: any;

    get userData(): UserDataModel | null {
      return userStore.userData;
    }

    get languages(): Locale[] {
      return LOCALES;
    }

    get currencies(): Currency[] {
      return CURRENCIES;
    }

    toggleMenu(): void {
      this.showMenu = !this.showMenu;
    }

    closeMenu(): void {
      this.timeout = setTimeout(() => this.showMenu = false, 600);
    }

    keepOpen(): void {
      if (this.timeout) {
        clearInterval(this.timeout);
      }
    }

    setLanguage(language: string): void {
      userStore.changeLanguage(language);
    }

    setCurrency(currency: string): void {
      userStore.changeCurrency(currency);
    }
}
</script>

<style lang="scss" scoped>
  #user_menu_wrapper {
    padding: 0.3em 2em 1em 0;

    .submenu-item {
      display: inline-grid;
      grid-template-columns: 2em auto;
      padding: 0.4em;
    }

    .clickable {
      cursor: pointer;

      &:hover {
        color: orange;
      }
    }

    .bag-details-container {
      position: absolute;
      top: 2.5em;
      left: 0;
      background-color: #ffffff;
      padding: 1em 1em 1em 1em;
      margin: 0;
      width: 20em;
      text-align: left;
      border: 1px solid lightgray;
      z-index: 3;

      .item-remove-icon {
        color: red;
        cursor: pointer;
      }
    }

    .bag-total-price {
      border-top: 2px solid lightgray;
      font-weight: bold;
      margin-top: 1em;
      padding-top: 0.5em;
    }
  }
</style>
