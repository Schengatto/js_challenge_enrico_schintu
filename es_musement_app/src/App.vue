<template>
  <div v-if="isCompatibleBrowser">
    <div id="app">
      <router-view/>
    </div>
  </div>
  <div v-else>
    <div id="incompatible_browser_wrapper">
      <div class="old-browser-message">
        <p>Sorry, but it seems like your browser is not fully compatible with this App.</p>
        <p>Try to access again with a modern browser.</p>
      </div>
      <div class="force-access-wrapper">
        <div class="force-access-message">
          <p>Anyway, it is possible to access the application but the user experience will not be
            guaranteed.</p>
        </div>
        <button class="force-btn clickable" @click="forceAccess()">Let me access</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import {
  isChrome,
  isChromium,
  isEdge,
  isEdgeChromium,
  isFirefox,
  isMobileSafari,
  isSafari,
} from 'mobile-device-detect';

  @Component({
    components: {},
  })
export default class Home extends Vue {
    private force = false;

    get isCompatibleBrowser() {
      return this.force || (isChrome || isFirefox || isEdge || isEdgeChromium || isSafari || isMobileSafari || isChromium);
    }

    public forceAccess() {
      this.force = true;
    }
}
</script>

<style lang="scss">

  #incompatible_browser_wrapper {
    padding: 2em;

    .old-browser-message {
      font-weight: bold;
      font-size: 18pt;
    }

    .force-access-message {
      border: 1px solid #ecd091;
      background-color: #ecd091;
      margin-top: 1em;
      padding: 0.5em 0 0 0.5em;
      font-style: italic;
    }

    .force-btn {
      padding: 0.5em;
      border: 1px solid grey;
      margin-top: 1em;

      &:hover {
        background-color: orange;
      }
    }
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
