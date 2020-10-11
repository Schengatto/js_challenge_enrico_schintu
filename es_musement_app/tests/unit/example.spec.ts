import {shallowMount} from "@vue/test-utils";
import AppVue from "@/App.vue";

describe("Test App.vue", () => {

  const wrapper = shallowMount(AppVue, {
    data() {
      return {
        forceAccess: false,
        isCompatibleBrowser: false
      }
    }
  })

  expect(wrapper.html().includes('button')).toBeFalsy();
});
