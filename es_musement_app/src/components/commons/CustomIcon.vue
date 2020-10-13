<template>
  <div class="icon" v-bind:class="{ clickable: clickable }">
    <template v-if="type === 'bag'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        :fill="color"
        viewBox="0 0 24 24"
      >
        <title>{{ title }}</title>
        <path
          d="M19.029 13h2.971l-.266 1h-2.992l.287-1zm.863-3h2.812l.296-1h-2.821l-.287 1zm-.576 2h4.387l.297-1h-4.396l-.288 1zm2.684-9l-.743 2h-1.929l-3.474 12h-11.239l-4.615-11h14.812l-.564 2h-11.24l2.938 7h8.428l3.432-12h4.194zm-14.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm5.9-7-.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"
        />
      </svg>
    </template>

    <template v-if="type === 'wishlist'">
      <svg :width="width" :height="height" :fill="color" viewBox="0 6 20 20">
        <title>{{ title }}</title>
        <polygon
          id="Wishlist-Icon"
          stroke="none"
          fill-rule="evenodd"
          points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"
        ></polygon>
      </svg>
    </template>

    <template v-if="type === 'left-arrow'">
      <img
        src="@/assets/icons/svg/arrow-left.svg"
        height="18px"
        width="8px"
        :alt="title"
        :title="title"
      />
    </template>

    <template v-if="type === 'right-arrow'">
      <img
        src="@/assets/icons/svg/arrow-right.svg"
        height="18px"
        width="8px"
        :alt="title"
        :title="title"
      />
    </template>

    <template v-if="type === 'user'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        :fill="color"
        viewBox="0 0 24 24"
      >
        <title>{{ title }}</title>
        <path
          d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"
        />
      </svg>
    </template>

    <template v-if="type === 'uk-flag'">
      <img
        src="@/assets/icons/svg/united-kingdom.svg"
        height="20px"
        width="20px"
        :alt="title"
        :title="title"
      />
    </template>

    <template v-if="type === 'it-flag'">
      <img
        src="@/assets/icons/svg/italy.svg"
        height="20px"
        width="20px"
        :alt="title"
        :title="title"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AppHeader extends Vue {
  /** The type of the icon that should be rendered */
  @Prop({ required: true }) type!: string;

  /** The title of the icon  */
  @Prop() title!: string;

  /** If true set CSS.cursor to pointer */
  @Prop({ default: true }) clickable!: boolean;

  /** The width of the icon  */
  @Prop() width!: string;

  /** The height of the icon  */
  @Prop() height!: string;

  /** The color of the icon  */
  @Prop() color!: string;
}
</script>
