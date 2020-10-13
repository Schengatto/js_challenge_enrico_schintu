import VueRouter from "vue-router";
import Vue from "vue";
import { mount, Wrapper } from "@vue/test-utils";
import { TestUtils } from "./test.utils";
import ShowcaseWrapper from "@/views/pages/ShowcaseWrapper.vue";

Vue.use(VueRouter);

describe("Test Showcase wrapper", () => {
  let component: Wrapper<ShowcaseWrapper>;
  let vm: any;

  beforeEach(() => {
    component = mount(ShowcaseWrapper, {
      store: TestUtils.store
    });
    vm = component.vm as any;
  });

  it("Component rendered in page", async () => {
    const bagWrapper = component.find("#showcase_wrapper");
    expect(bagWrapper.isVisible()).toBeTruthy();
  });
});
