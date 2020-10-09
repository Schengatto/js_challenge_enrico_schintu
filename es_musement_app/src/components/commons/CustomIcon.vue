<template>
  <div class="icon" v-bind:class="{ clickable: clickable }">
    <template v-if="type === 'bag'">
      <img src="@/assets/icons/svg/bag.svg" height="18px" width="17px" :alt="title" :title="title">
    </template>

    <template v-if="type === 'wishlist'">
      <svg class="icon" width="20px" height="20px" viewBox="0 6 20 20">
        <title>{{ title }}</title>
        <polygon
          id="Wishlist-Icon"
          stroke="none"
          fill-rule="evenodd"
          points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6">
        </polygon>
      </svg>
    </template>

    <template v-if="type === 'left-arrow'">
      <img src="@/assets/icons/svg/arrow-left.svg" height="18px" width="8px" :alt="title"
           :title="title">
    </template>

    <template v-if="type === 'right-arrow'">
      <img src="@/assets/icons/svg/arrow-right.svg" height="18px" width="8px" :alt="title"
           :title="title">
    </template>

    <template v-if="type === 'user'">
      <img src="@/assets/icons/svg/user-circle.svg" height="40px" width="40px" :alt="title"
           :title="title">
    </template>

    <template v-if="type === 'uk-flag'">
      <img src="@/assets/icons/svg/united-kingdom.svg" height="20px" width="20px" :alt="title"
           :title="title">
    </template>

    <template v-if="type === 'it-flag'">
      <img src="@/assets/icons/svg/italy.svg" height="20px" width="20px" :alt="title"
           :title="title">
    </template>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
export default class AppHeader extends Vue {
    @Prop() type!: string;

    @Prop() title!: string;

    @Prop({ default: true }) clickable!: boolean;
}
</script>

<style lang="scss" scoped>
  .clickable {
    cursor: pointer;
  }
</style>
