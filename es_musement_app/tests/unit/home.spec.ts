import VueRouter from 'vue-router'
import Vue from 'vue'
import {shallowMount, Wrapper} from "@vue/test-utils";
import Home from "@/views/Home.vue";
import router from "@/router";
import VueI18n from "vue-i18n";

Vue.use(VueRouter);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  messages: {}
});

describe("Test Home Component", () => {
  let component!: Wrapper<Home>;

  beforeEach(() => {
    component = shallowMount(Home, {
      mocks: {
        $t: (key: any) => key
      }
    });
  });

  it('Element created and visible in page', () => {
    const target = component.find('.product-page');
    expect(target.isVisible()).toBeTruthy();
  });
});
