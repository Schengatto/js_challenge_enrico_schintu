<template>
  <div>
    <AppHeader></AppHeader>
    <main class="product-page">
      <router-view/>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<script lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';

import {Component, Vue} from 'vue-property-decorator';

  @Component({
    components: {
      AppFooter,
      AppHeader,
    },
  })
export default class Home extends Vue {
}
</script>
