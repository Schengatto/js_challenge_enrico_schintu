import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import i18n from "./i18n";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
