<template>
  <footer class="container">
    <div class="footer-extra">Made with ❤️ by Enrico Schintu</div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppFooter extends Vue {}
</script>

<style scoped>
.footer-extra {
  width: 100%;
  text-align: center;
  font-style: italic;
  font-variant: all-small-caps;
}

.footer-nav {
  margin-right: 1em;
}
</style>
