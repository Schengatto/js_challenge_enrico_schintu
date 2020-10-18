<template>
  <div
    class="image-container unselectable"
    v-bind:style="{ backgroundColor: backgroundColor, width: width + 'px', height: height + 'px' }"
  >
    <div v-if="startLoading">
      <img
        class="product__image product-image"
        itemprop="image"
        :alt="title"
        :src="imageSrc"
        :width="width + 'px'"
        :height="height"
        @load="imageLoaded()"
      />
    </div>
    <div v-if="isLoading" v-bind:style="{ width: width, height: height }" class="loading-spinner">
      <svg
        style="margin: auto; background: none; display: block; shape-rendering: crispedges;"
        :width="width + 'px'"
        :height="height + 'px'"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="rotate(0 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.9166666666666666s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(30 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.8333333333333334s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(60 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.75s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(90 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.6666666666666666s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(120 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.5833333333333334s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(150 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.5s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(180 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.4166666666666667s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(210 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.3333333333333333s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(240 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.25s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(270 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.16666666666666666s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(300 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.08333333333333333s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(330 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#359dae">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="0s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ImageWrapper extends Vue {
  /** Width in px */
  @Prop({ required: true }) width!: number;

  /** Height in px */
  @Prop({ required: true }) height!: number;

  /** source of the image */
  @Prop({ required: true }) src!: string;

  /** background color behind the image */
  @Prop() backgroundColor!: string;

  /** Image title used as alt value */
  @Prop() title!: string;

  /** Quality numeric ratio (from 1 to 100) of the image. Available for Musement images
   * @default 70 */
  @Prop({ default: 70 }) quality!: number;

  /** Original width of the image. Available for Musement images */
  @Prop() srcWidth!: number;

  /** Original height of the image. Available for Musement images */
  @Prop() srcHeight!: number;

  /** If true the resource is retrieved from the Musement server and
   *  it will be possible to set the img quality, srcWidth, srcHeight */
  @Prop({ default: true }) musementImage!: boolean;

  /** If true detect will send back a feedback about the speed of the client network */
  @Prop({ default: false }) detectNetworkSpeed!: boolean;

  loadStartAt: number = new Date().getTime();

  private startLoading = false;

  private loaded = false;

  private timeout!: NodeJS.Timeout;

  /**
   * Enable the spinner.
   */
  created() {
    this.timeout = setTimeout(() => {
      this.startLoading = true;
    }, 0);
  }

  /**
   * Disable the spinner and detect if the network connection is slow,
   */
  imageLoaded(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.loaded = true;
    if (this.detectNetworkSpeed) {
      const loadDuration = new Date().getTime() - this.loadStartAt;
      this.checkNetworkSpeed(loadDuration);
    }
  }

  /** If enabled, check the network speed and emit an event in case of fast or slow network */
  private checkNetworkSpeed(loadDuration: number) {
    if (loadDuration > 2500) {
      this.$emit("slowNetwork", true);
    } else if (loadDuration < 500) {
      this.$emit("fastNetwork", true);
    } else {
      this.$emit("goodNetwork", true);
    }
  }

  /**
   * Invoked when the image is loaded.
   */
  get isLoading() {
    return !this.loaded;
  }

  /**
   * Image URL source.
   */
  get imageSrc(): string {
    return this.musementImage
      ? `${this.src}?fit=crop&w=${this.realWidth}&h=${this.realHeight}&q=${this.quality}`
      : this.src;
  }

  /**
   * Real width of the image resource. Used only for Musement images.
   */
  get realWidth(): number {
    return this.srcWidth ? this.srcWidth : this.width;
  }

  /**
   * Real height of the image resource. Used only for Musement images.
   */
  get realHeight() {
    return this.srcHeight ? this.srcHeight : this.height;
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
