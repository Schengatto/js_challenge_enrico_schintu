<template>
  <div class="image-container"
       v-bind:style="{backgroundColor: backgroundColor, width: width, height: height}">
    <div v-if="startLoading">
      <img class="product__image product-image"
           itemprop="image"
           :alt="title"
           :src="src"
           :width="width"
           :height="height"
           @load="imageLoaded()"/>
    </div>
    <div v-if="isLoading" v-bind:style="{width: width, height: height}" class="loading-spinner">
      <svg style="margin: auto; background: none; display: block; shape-rendering: crispedges;"
           :width="width" :height="height" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <g transform="rotate(0 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                     begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(30 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                     begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(60 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s"
                     repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(90 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                     begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(120 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                     begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(150 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s"
                     repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(180 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                     begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(210 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                     begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(240 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s"
                     repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(270 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                     begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(300 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                     begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(330 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s"
                     repeatCount="indefinite"></animate>
          </rect>
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
export default class ImageWrapper extends Vue {
    @Prop() title!: string;

    @Prop() width!: string;

    @Prop() height!: string;

    @Prop() src!: string;

    @Prop() backgroundColor!: string;

    startLoading = false;

    private loaded = false;

    private timeout!: NodeJS.Timeout;

    get isLoading() {
      return !this.loaded;
    }

    created() {
      this.timeout = setTimeout(() => {
        this.startLoading = true;
      }, 100);
    }

    imageLoaded(): void {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.loaded = true;
    }
}
</script>

<style lang="scss" scoped>
  .image-container {
    position: relative;
  }

  .loading-spinner {
    position: absolute;
    top: 0;
    z-index: 1;
  }
</style>